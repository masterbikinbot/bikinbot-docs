import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '1.4rem' }}>🤖</span>
      <span>BikinBot<span style={{ color: '#6366f1' }}>.ai</span></span>
      <span style={{
        fontSize: '0.65rem',
        fontWeight: 600,
        background: 'rgba(99,102,241,0.15)',
        color: '#6366f1',
        padding: '2px 8px',
        borderRadius: '999px',
        border: '1px solid rgba(99,102,241,0.3)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>Docs</span>
    </span>
  ),
  project: {
    link: 'https://bikinbot.ai',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  chat: {
    link: 'https://t.me/bikinbotai',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  docsRepositoryBase: 'https://github.com/masterbikinbot/bikinbot-docs/blob/main',
  footer: {
    text: (
      <span style={{ fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} BikinBot.ai — Platform AI Agent Indonesia. Butuh bantuan?{' '}
        <a href="https://t.me/bikinbotai" style={{ color: '#6366f1' }} target="_blank" rel="noopener">Telegram</a>
        {' · '}
        <a href="https://bikinbot.ai" style={{ color: '#6366f1' }} target="_blank" rel="noopener">Dashboard</a>
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s — BikinBot.ai Docs',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Dokumentasi lengkap BikinBot.ai — Platform AI Agent untuk Telegram & WhatsApp" />
      <link rel="icon" href="https://bikinbot.ai/favicon.ico" />
      <meta property="og:title" content="BikinBot.ai Documentation" />
      <meta property="og:description" content="Panduan lengkap BikinBot.ai — buat, konfigurasi, dan optimalkan AI Agent kamu." />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6366f1' }}>{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
    title: 'Di halaman ini',
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: true,
  primaryHue: 250,
  primarySaturation: 90,
}

export default config
