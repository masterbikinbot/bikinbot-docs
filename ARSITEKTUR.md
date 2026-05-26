# Arsitektur Platform BikinBot.ai

> Versi: v3.7 — 2026-05-26

---

## Alur Pesan

```
 User
  │  (chat di Telegram)
  ▼
 Telegram Bot API
  │  (webhook / long-polling per bot)
  ▼
 OpenClaw  ──────────────────────────────────────────────────────────┐
 (proses Node.js per-bot, isolated)                                  │
  │                                                                  │
  │  kirim pesan + history konteks                                   │ sync: model config,
  ▼                                                                  │ billing deduct,
 OpenRouter                                                          │ settings
  │  route ke model pilihan user (fixed, tidak ada auto-routing)     │
  ├── google/gemini-2.0-flash-lite-001  (default, ~Rp 9/pesan)       ▼
  ├── openai/gpt-5 / gpt-5.1                          BikinBot.ai API
  ├── anthropic/claude-4.5 / opus-4.5                  (Fastify, Node.js)
  ├── google/gemini-2.5-pro / 3.1-pro                       │
  ├── x-ai/grok-4                                            │
  ├── deepseek/deepseek-v4-flash / r1                        ▼
  └── 30+ model lainnya...                              Supabase
                                                  (PostgreSQL + Auth)
                                                  - users
                                                  - bots config
                                                  - credits / billing
                                                  - audit log
```

---

## Komponen

| Komponen | Teknologi | Fungsi |
|----------|-----------|--------|
| **Dashboard** | Next.js 14 + React + TailwindCSS | UI konfigurasi bot, billing, model selection, analytics |
| **API** | Fastify (Node.js) | Backend platform — auth, bot CRUD, billing, credit deduction |
| **OpenClaw** | Node.js (per-bot process) | Runtime AI agent Telegram — isolated per user/bot |
| **Database** | Supabase (PostgreSQL) | User data, bot config, credits, referral, audit trail |
| **AI Router** | OpenRouter | Proxy unified ke 36+ model AI dari berbagai provider |
| **Infra** | PM2 + Caddy + Ubuntu 22.04 | Process manager, reverse proxy + TLS, OS |
| **CDN/Hosting** | Vercel (dashboard) + Alibaba Cloud (API + bots) | Deployment frontend dan backend |

---

## Infrastruktur Server

```
                    ┌─────────────────────────────┐
                    │        Vercel CDN            │
                    │   bikinbot.ai (Next.js)      │
                    │   docs.bikinbot.ai (Nextra)  │
                    └──────────────┬──────────────┘
                                   │ HTTPS API calls
                                   ▼
                    ┌─────────────────────────────────────┐
                    │       Alibaba Cloud Server           │
                    │                                      │
                    │  Caddy (reverse proxy + TLS)         │
                    │    ├── :443 → bikinbot-api (3001)    │
                    │    └── :443 → bikinbot-docs (3004)   │
                    │                                      │
                    │  PM2 (process manager)               │
                    │    ├── bikinbot-api-fastify  (id: 0) │
                    │    ├── bikinbot-web          (id: 1) │
                    │    └── bikinbot-docs         (id: 2) │
                    │                                      │
                    │  Bot Processes (systemd per-bot)     │
                    │    ├── openclaw-<bot_id_1>           │
                    │    ├── openclaw-<bot_id_2>           │
                    │    └── openclaw-<bot_id_N>           │
                    └─────────────────────────────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │         Supabase             │
                    │  (managed PostgreSQL + Auth) │
                    └─────────────────────────────┘
```

---

## OpenClaw — Per-Bot Runtime

Setiap user/bot mendapat **satu proses OpenClaw independen**:

```
openclaw-<bot_id>/
  ├── bot.js              # entry point, Telegram polling/webhook
  ├── config.json         # model, persona, token, settings
  ├── KNOWLEDGE.md        # knowledge base user (jika diset)
  ├── memory/             # persistent memory (facts, preferences)
  └── media/              # file upload sementara
```

Properti isolasi:
- **Memory**: tidak bercampur antar user
- **Context**: setiap bot punya history percakapan sendiri
- **Crash isolation**: satu bot crash tidak mempengaruhi bot lain
- **Model**: dipilih per-bot, bukan shared pool
- **File**: upload dan processing terpisah per bot

---

## Model Selection (sejak v3.6)

```
User pilih model
  │
  ├── via Dashboard → Settings → Pilihan Model
  │     └── disimpan ke config.json + Supabase
  │
  └── via chat ke bot → "ganti model ke deepseek/deepseek-v4-flash"
        └── OpenClaw update config.json runtime (persistent)

OpenClaw baca config.json saat startup
  └── semua pesan dikirim ke model tersebut via OpenRouter
        └── TIDAK ada classifyPrompt() atau auto-routing
```

Model command `/model` di Telegram hanya membuat **session override** (tidak persistent, reset saat bot restart).

---

## Billing & Credit Flow

```
User kirim pesan
  │
  ▼
OpenClaw → OpenRouter → AI Model → response
  │
  ▼
OpenClaw hitung token usage (input + output)
  │
  ▼
POST /api/billing/deduct → BikinBot API
  │
  ▼
Supabase: kurangi credits user
  │
  ├── credits > 0 → lanjut normal
  └── credits = 0 → bot kirim notif + blokir response
```

Biaya per pesan:
- Gratis: `gemma-3-27b:free`, `llama-3.3-70b:free`, dll = **Rp 0**
- Hemat: `deepseek-v4-flash` ~Rp 3, `gemini-2.0-flash-lite-001` ~Rp 9
- Standar: `gemini-2.5-pro` ~Rp 60, `gpt-5` ~Rp 60
- Premium: `claude-opus-4.5` ~Rp 495, `gpt-5.1` ~Rp 200+

---

## Referral System

```
User A (referrer) share kode referral
  │
  ▼
User B (referee) input kode saat subscribe
  │
  ▼
Supabase: referral_uses insert
  │
  ├── User B dapat bonus Rp 20.000 credit
  └── User A dapat komisi 10% dari setiap pembayaran User B (selamanya)
        └── dicatat di referral_commissions (audit trail)
```

---

## Monitoring & Reliability

- **PM2**: auto-restart on crash, max 10 restarts (circuit breaker)
- **Guardian script**: monitoring per-bot, alert Telegram jika down
- **Caddy**: TLS auto-renew via Let's Encrypt
- **Supabase**: managed database dengan backup otomatis
- **Cron**: 22 jobs aktif — jadwal dioptimasi (v3.5), config-validator ditambahkan (v3.6)
- **Cascade Guard**: sentinel restart threshold 50% fleet — mencegah mass-restart setelah OpenClaw update (v3.7)
- **Slow-request log**: request >2s dicatat dengan label `[perf] slow-request` untuk diagnosis latency (v3.7)

---

## Tech Stack Ringkas

```
Frontend    → Next.js 14 (App Router), TailwindCSS, Supabase Auth
Backend     → Fastify (Node.js), Supabase PostgreSQL
Bot Runtime → OpenClaw (Node.js), Telegram Bot API
AI          → OpenRouter (36+ model: OpenAI, Anthropic, Google, xAI, DeepSeek, dll)
Infra       → Alibaba Cloud, Vercel, PM2, Caddy, Ubuntu 22.04
Docs        → Nextra v2 (Next.js), docs.bikinbot.ai
```
