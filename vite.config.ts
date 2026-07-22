import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

/** GitHub Pages SPA fallback: unknown paths serve index.html */
function spaFallback() {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const index = resolve(root, 'dist/index.html')
      const fallback = resolve(root, 'dist/404.html')
      if (existsSync(index)) copyFileSync(index, fallback)
    },
  }
}

export default defineConfig({
  // Set VITE_BASE=/ausweis-web/ in CI for project Pages.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
