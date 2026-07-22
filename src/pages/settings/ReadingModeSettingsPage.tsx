import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { SelectionCheck } from '@/components/ios/PageChrome'
import { useSettings } from '@/context/SettingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'
import type { ReadingMode } from '@/context/SettingsContext'

const options: {
  value: ReadingMode
  labelKey: 'settingsReadingNfc' | 'settingsReadingRemote'
}[] = [
  { value: 'nfc', labelKey: 'settingsReadingNfc' },
  { value: 'remote', labelKey: 'settingsReadingRemote' },
]

export function ReadingModeSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { readingMode, setReadingMode } = useSettings()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('settingsReadingMode')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(routes.settings)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList footer={t('settingsReadingModeFooter')}>
          {options.map((opt) => (
            <ListRow
              key={opt.value}
              title={t(opt.labelKey)}
              onClick={() => setReadingMode(opt.value)}
              trailing={
                readingMode === opt.value ? <SelectionCheck /> : undefined
              }
            />
          ))}
        </GroupedList>
      </div>
    </div>
  )
}
