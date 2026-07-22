import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { SelectionCheck } from '@/components/ios/PageChrome'
import { useI18n } from '@/i18n/I18nContext'
import {
  LOCALE_OPTIONS,
  type Locale,
  type TranslationKey,
} from '@/i18n/translations'
import { routes } from '@/lib/routes'

const LABEL_KEY: Record<Locale, TranslationKey> = {
  system: 'settingsLanguageSystem',
  de: 'settingsLanguageDe',
  en: 'settingsLanguageEn',
  tr: 'settingsLanguageTr',
  ru: 'settingsLanguageRu',
  pl: 'settingsLanguagePl',
  uk: 'settingsLanguageUk',
  ar: 'settingsLanguageAr',
}

export function LanguageSettingsPage() {
  const { t, locale, setLocale } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('settingsLanguage')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(routes.settings)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-0 py-8">
        <GroupedList header={t('settingsLanguageHeader')}>
          {LOCALE_OPTIONS.map((lang) => {
            const selected = locale === lang.code
            const subtitle =
              lang.code === 'system'
                ? t('settingsLanguageSystemUses')
                : lang.native
            return (
              <ListRow
                key={lang.code}
                title={t(LABEL_KEY[lang.code])}
                subtitle={subtitle}
                onClick={() => setLocale(lang.code)}
                trailing={selected ? <SelectionCheck /> : undefined}
              />
            )
          })}
        </GroupedList>
      </div>
    </div>
  )
}
