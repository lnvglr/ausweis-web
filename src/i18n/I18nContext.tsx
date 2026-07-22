import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  isLocale,
  isRtlLocale,
  resolveContentLocale,
  translations,
  type ContentLocale,
  type Locale,
  type TranslationKey,
} from './translations'

type I18nContextValue = {
  /** Stored preference (may be `system`). */
  locale: Locale
  /** Resolved catalog used for `t()`. */
  contentLocale: ContentLocale
  /** True when the resolved catalog is right-to-left (Arabic). */
  rtl: boolean
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'ausweis-locale'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) return stored
  return 'system'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const contentLocale = resolveContentLocale(locale)
  const rtl = isRtlLocale(contentLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = contentLocale
  }, [contentLocale])

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      let value: string = translations[contentLocale][key]
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(`{${k}}`, String(v))
        }
      }
      return value
    },
    [contentLocale],
  )

  const value = useMemo(
    () => ({ locale, contentLocale, rtl, setLocale, t }),
    [locale, contentLocale, rtl, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
