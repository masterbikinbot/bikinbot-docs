# Deploy BikinBot Docs

## Opsi 1: Alibaba (Recommended — sudah ada infrastruktur)

Tidak perlu Vercel. Deploy langsung ke Alibaba yang sudah punya Caddy.

```bash
# Di server Alibaba
cd /srv/bikinbot
git clone https://github.com/masterbikinbot/bikinbot-docs
cd bikinbot-docs
npm install
npm run build

# Jalankan via PM2
pm2 start npm --name bikinbot-docs -- start -- -p 3004
pm2 save
```

**Caddy config** — tambahkan ke `/etc/caddy/Caddyfile`:
```
docs.bikinbot.ai {
    reverse_proxy localhost:3004
}
```

**DNS** — tambahkan di Cloudflare:
```
CNAME  docs  47.84.98.111
```

Selesai! `docs.bikinbot.ai` langsung live.

---

## Opsi 2: Static Export → GitHub Pages (Zero cost, zero server)

Ubah `next.config.js` untuk static export:
```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
})

module.exports = withNextra({
  reactStrictMode: true,
  output: 'export',       // enable static export
  images: { unoptimized: true },
  basePath: '/bikinbot-docs',  // sesuaikan dengan repo name
})
```

```bash
npm run build   # generates /out folder
```

Enable GitHub Pages di repo settings → pilih `gh-pages` branch atau `/out` folder.

---

## Opsi 3: Cloudflare Pages (Free tier tersedia)

1. Buka https://pages.cloudflare.com
2. Connect GitHub → pilih `masterbikinbot/bikinbot-docs`
3. Build settings:
   - Build command: `npm run build`
   - Output dir: `.next`
   - Framework preset: `Next.js`
4. Add domain: `docs.bikinbot.ai`
5. Cloudflare handle DNS otomatis

---

## Update docs

```bash
git add -A
git commit -m "docs: update [page]"
git push

# Di Alibaba: pull + restart
cd /srv/bikinbot/bikinbot-docs
git pull
npm run build
pm2 restart bikinbot-docs
```
