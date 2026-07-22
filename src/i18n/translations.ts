import ar from './locales/ar.json'
import de from './locales/de.json'
import en from './locales/en.json'
import pl from './locales/pl.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import uk from './locales/uk.json'

export type ContentLocale = 'en' | 'de' | 'tr' | 'ru' | 'pl' | 'uk' | 'ar'
/** User preference — includes system (follows the device language). */
export type Locale = 'system' | ContentLocale

export type TranslationKey = keyof typeof en

export const LOCALE_OPTIONS: {
  code: Locale
  /** Native endonym shown as the subtitle (empty for system). */
  native: string
}[] = [
  { code: 'system', native: '' },
  { code: 'de', native: 'Deutsch' },
  { code: 'en', native: 'English' },
  { code: 'tr', native: 'Türkçe' },
  { code: 'ru', native: 'Русский' },
  { code: 'pl', native: 'Polski' },
  { code: 'uk', native: 'Українська' },
  { code: 'ar', native: 'العربية' },
]

export function isLocale(value: string | null): value is Locale {
  return (
    value === 'system' ||
    value === 'de' ||
    value === 'en' ||
    value === 'tr' ||
    value === 'ru' ||
    value === 'pl' ||
    value === 'uk' ||
    value === 'ar'
  )
}

function isContentLocale(value: string): value is ContentLocale {
  return (
    value === 'de' ||
    value === 'en' ||
    value === 'tr' ||
    value === 'ru' ||
    value === 'pl' ||
    value === 'uk' ||
    value === 'ar'
  )
}

/** Map preference → catalog used for `t()`. */
export function resolveContentLocale(preference: Locale): ContentLocale {
  if (preference !== 'system' && isContentLocale(preference)) return preference

  const tag = navigator.language.toLowerCase()
  if (tag.startsWith('de')) return 'de'
  if (tag.startsWith('tr')) return 'tr'
  if (tag.startsWith('ru')) return 'ru'
  if (tag.startsWith('pl')) return 'pl'
  if (tag.startsWith('uk')) return 'uk'
  if (tag.startsWith('ar')) return 'ar'
  return 'en'
}

export function isRtlLocale(locale: ContentLocale): boolean {
  return locale === 'ar'
}

export const translations: Record<ContentLocale, Record<TranslationKey, string>> =
  {
    en,
    de,
    tr,
    ru,
    pl,
    uk,
    ar,
  }
