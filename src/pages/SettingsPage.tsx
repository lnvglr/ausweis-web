import { Link } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { IOSSwitch } from '@/components/ios/IOSSwitch'
import { NavBar } from '@/components/ios/NavBar'
import { useSettings } from '@/context/SettingsContext'
import { useI18n } from '@/i18n/I18nContext'

export function SettingsPage() {
  const { t, locale } = useI18n()
  const s = useSettings()

  const appearanceLabel =
    s.appearance === 'system'
      ? t('settingsAppearanceSystem')
      : s.appearance === 'light'
        ? t('settingsAppearanceLight')
        : t('settingsAppearanceDark')

  const readingLabel =
    s.readingMode === 'nfc' ? t('settingsReadingNfc') : t('settingsReadingRemote')

  const languageLabel =
    locale === 'de' ? t('settingsLanguageDe') : t('settingsLanguageEn')

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar title={t('settingsTitle')} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-32 pt-3">
        <GroupedList>
          <Link
            to="/settings/change-pin"
            className="block active:bg-ios-fill/60"
          >
            <ListRow title={t('settingsChangePin')} chevron />
          </Link>
        </GroupedList>

        <GroupedList>
          <Link
            to="/settings/language"
            className="block active:bg-ios-fill/60"
          >
            <ListRow
              title={t('settingsLanguage')}
              detail={languageLabel}
              chevron
            />
          </Link>
          <Link
            to="/settings/appearance"
            className="block active:bg-ios-fill/60"
          >
            <ListRow
              title={t('settingsAppearance')}
              detail={appearanceLabel}
              chevron
            />
          </Link>
          <Link
            to="/settings/reading-mode"
            className="block active:bg-ios-fill/60"
          >
            <ListRow
              title={t('settingsReadingMode')}
              detail={readingLabel}
              chevron
            />
          </Link>
        </GroupedList>

        <GroupedList>
          <Link
            to="/settings/device-name"
            className="block active:bg-ios-fill/60"
          >
            <ListRow
              title={t('settingsDeviceName')}
              detail={s.deviceName}
              chevron
            />
          </Link>
          <ListRow
            title={t('settingsPinOnDevice')}
            trailing={
              <IOSSwitch
                checked={s.pinOnThisDevice}
                onChange={s.setPinOnThisDevice}
              />
            }
          />
          <ListRow
            title={t('settingsShowAuthOnDevice')}
            trailing={
              <IOSSwitch
                checked={s.showAuthOnThisDevice}
                onChange={s.setShowAuthOnThisDevice}
              />
            }
          />
          <Link
            to="/settings/pairings"
            className="block active:bg-ios-fill/60"
          >
            <ListRow title={t('settingsManagePairings')} chevron />
          </Link>
        </GroupedList>

        <GroupedList>
          <ListRow
            title={t('settingsRandomizeKeys')}
            trailing={
              <IOSSwitch
                checked={s.randomizeKeys}
                onChange={s.setRandomizeKeys}
              />
            }
          />
          <ListRow
            title={t('settingsDetectRecording')}
            trailing={
              <IOSSwitch
                checked={s.detectScreenRecording}
                onChange={s.setDetectScreenRecording}
              />
            }
          />
        </GroupedList>

        <GroupedList>
          <Link
            to="/settings/device-check"
            className="block active:bg-ios-fill/60"
          >
            <ListRow title={t('checkTitle')} chevron />
          </Link>
          <Link to="/settings/help" className="block active:bg-ios-fill/60">
            <ListRow title={t('helpTitle')} chevron />
          </Link>
        </GroupedList>

        <GroupedList>
          <ListRow title={t('settingsVersion')} detail="1.0" />
          <Link to="/privacy" className="block active:bg-ios-fill/60">
            <ListRow title={t('settingsPrivacy')} chevron />
          </Link>
        </GroupedList>
      </div>
    </div>
  )
}
