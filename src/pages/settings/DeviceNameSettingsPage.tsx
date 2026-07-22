import { useNavigate } from 'react-router-dom'
import { GroupedList } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useSettings } from '@/context/SettingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'

export function DeviceNameSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { deviceName, setDeviceName } = useSettings()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('settingsDeviceName')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(routes.settings)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto py-8">
        <GroupedList footer={t('settingsDeviceNameFooter')}>
          <input
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value.slice(0, 32))}
            className="w-full bg-transparent px-4 py-[14px] text-[17px] leading-[22px] tracking-[-0.2px] text-ios-label outline-none"
            autoFocus
            autoCapitalize="words"
          />
        </GroupedList>
      </div>
    </div>
  )
}
