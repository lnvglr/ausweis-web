import { useEffect, useState } from 'react'
import { useSettings } from '@/context/SettingsContext'

/** Tracks `prefers-color-scheme: dark`. */
export function usePrefersDark() {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return dark
}

/** Resolved light/dark from Appearance setting + system preference. */
export function useColorScheme(): 'light' | 'dark' {
  const { appearance } = useSettings()
  const systemDark = usePrefersDark()

  if (appearance === 'dark') return 'dark'
  if (appearance === 'light') return 'light'
  return systemDark ? 'dark' : 'light'
}
