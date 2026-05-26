import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

// BikinBot brand icon (from logo-icon.svg)
const BotIcon = () => (
  <svg width="26" height="26" viewBox="0 0 156.09 128.39" xmlns="http://www.w3.org/2000/svg">
    <path fill="#fff" d="M15.64,59v39.21c0,.45-.43.78-.86.64C6.2,96.12,0,88.08,0,78.6s6.2-17.5,14.78-20.24c.42-.14.86.2.86.64Z"/>
    <path fill="#fff" d="M156.09,78.6c0,9.48-6.2,17.52-14.78,20.25-.42.14-.86-.2-.86-.64v-39.21c0-.45.43-.78.86-.64,8.58,2.73,14.78,10.77,14.78,20.24Z"/>
    <path fill="#fff" d="M134.89,57.34c-4.74-16.28-19.76-28.18-37.57-28.18h-14.09c-.99,0-1.79-.8-1.79-1.79v-6.73c0-.67.37-1.29.97-1.58,3.35-1.62,5.66-5.06,5.66-9.03,0-5.55-4.5-10.04-10.04-10.04s-10.04,4.48-10.04,10.04c0,3.97,2.31,7.4,5.66,9.03.6.29.97.91.97,1.58v6.73c0,.99-.8,1.79-1.79,1.79h-14.09c-17.81,0-32.83,11.89-37.57,28.18-1.02,3.47-1.56,7.15-1.56,10.95v20.97c0,3.68.5,7.24,1.46,10.61,4.62,16.45,19.74,28.52,37.66,28.52h38.56c17.93,0,33.04-12.07,37.66-28.52.96-3.37,1.46-6.93,1.46-10.61v-20.97c0-3.8-.54-7.48-1.56-10.95ZM118.25,91.93c-.76,1.1-1.63,2.13-2.58,3.08-4.24,4.24-10.11,6.87-16.58,6.87h-42.09c-7.93,0-14.93-3.93-19.16-9.95-2.71-3.81-4.29-8.48-4.29-13.51s1.53-9.53,4.16-13.32c.79-1.16,1.7-2.25,2.71-3.26,4.24-4.24,10.11-6.87,16.58-6.87h42.09c8,0,15.07,4.02,19.29,10.13,2.63,3.79,4.16,8.37,4.16,13.32s-1.58,9.7-4.29,13.51Z"/>
    <path fill="#9b8bf9" d="M64.5,78.6c0,4.77-3.89,8.62-8.67,8.57s-8.4-3.86-8.48-8.41c-.09-4.8,3.78-8.72,8.57-8.72s8.57,3.84,8.57,8.56Z"/>
    <path fill="#9b8bf9" d="M108.74,78.6c0,4.77-3.89,8.62-8.67,8.57-4.55-.05-8.4-3.86-8.48-8.41-.09-4.8,3.78-8.72,8.57-8.72s8.57,3.84,8.57,8.56Z"/>
  </svg>
)

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '9px', letterSpacing: '-0.01em' }}>
      <BotIcon />
      <span style={{ fontFamily: 'Figtree, system-ui, sans-serif' }}>
        BikinBot<span style={{ color: '#9b8bf9' }}>.ai</span>
      </span>
      <span style={{
        fontSize: '0.6rem',
        fontWeight: 700,
        background: 'rgba(155,139,249,0.12)',
        color: '#9b8bf9',
        padding: '2px 8px',
        borderRadius: '999px',
        border: '1px solid rgba(155,139,249,0.25)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>Docs</span>
    </span>
  ),
  project: {
    link: 'https://bikinbot.ai',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  chat: {
    link: 'https://t.me/bikinbotai',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  docsRepositoryBase: 'https://github.com/masterbikinbot/bikinbot-docs/blob/main',
  footer: {
    text: (
      <span style={{ fontSize: '0.82rem', color: '#6b7280', fontFamily: 'Figtree, system-ui, sans-serif' }}>
        &copy; {new Date().getFullYear()} BikinBot.ai &mdash; Platform AI Agent Telegram Indonesia.{' '}
        <a href="https://t.me/bikinbotai" style={{ color: '#9b8bf9' }} target="_blank" rel="noopener">Bantuan</a>
        {' · '}
        <a href="https://bikinbot.ai" style={{ color: '#9b8bf9' }} target="_blank" rel="noopener">Dashboard</a>
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
      <meta name="description" content="Dokumentasi lengkap BikinBot.ai — Platform AI Agent Telegram terbaik di Indonesia." />
      <link rel="icon" href="https://bikinbot.ai/favicon.ico" />
      <meta property="og:title" content="BikinBot.ai Documentation" />
      <meta property="og:description" content="Panduan lengkap BikinBot.ai — buat, konfigurasi, dan optimalkan AI Agent Telegram kamu." />
      <meta property="og:image" content="https://bikinbot.ai/og-image.png" />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return (
          <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: '#9b8bf9', opacity: 0.7 }}>
            {title}
          </span>
        )
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
  primaryHue: 262,
  primarySaturation: 83,
}

export default config
