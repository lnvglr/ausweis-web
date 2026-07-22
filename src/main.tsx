import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/** Landing display/body faces — load before first paint to avoid metric jumps. */
const LANDING_FACES = [
  '500 48px Syne',
  '600 48px Syne',
  '700 48px Syne',
  '400 16px "DM Sans"',
  '500 16px "DM Sans"',
  '600 16px "DM Sans"',
  '700 16px "DM Sans"',
] as const

async function waitForFonts() {
  if (!document.fonts?.load) return

  try {
    await Promise.race([
      (async () => {
        await Promise.all(LANDING_FACES.map((face) => document.fonts.load(face)))
        await document.fonts.ready
      })(),
      // Don't block forever on a slow/failed font CDN.
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, 2500)
      }),
    ])
  } catch {
    // Proceed with fallbacks if Font Loading API fails.
  }
}

async function boot() {
  await waitForFonts()
  document.documentElement.classList.add('fonts-ready')

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void boot()
