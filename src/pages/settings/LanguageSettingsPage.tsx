import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { SelectionCheck } from '@/components/ios/PageChrome'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'
import type { Locale } from '@/i18n/translations'

const languages: {
  code: Locale
  labelKey: 'settingsLanguageEn' | 'settingsLanguageDe'
  native: string
}[] = [
  { code: 'en', labelKey: 'settingsLanguageEn', native: 'English' },
  { code: 'de', labelKey: 'settingsLanguageDe', native: 'Deutsch' },
]

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
      <div className="min-h-0 flex-1 overflow-y-auto px-0 pb-8 pt-4">
        <GroupedList header={t('settingsLanguageHeader')}>
          {languages.map((lang) => {
            const selected = locale === lang.code
            return (
              <ListRow
                key={lang.code}
                title={t(lang.labelKey)}
                subtitle={lang.native}
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
