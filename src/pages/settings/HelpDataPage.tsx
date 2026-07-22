import { useNavigate } from 'react-router-dom'
import { GroupedList } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useI18n } from '@/i18n/I18nContext'

const DEMO_LOGS = [
  '[12:01:04] NFC session started',
  '[12:01:05] Waiting for ID card…',
  '[12:01:08] Card detected (ISO 14443)',
  '[12:01:09] PACE established',
  '[12:01:11] Reading personal data',
  '[12:01:12] Session closed — success',
]

export function HelpDataPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const systemRows = [
    [t('helpInfoApplication'), 'AusweisApp'],
    [t('helpInfoVersion'), '1.0.0-demo'],
    [t('helpInfoOrganization'), 'Governikus GmbH & Co. KG'],
    [t('helpInfoDomain'), 'governikus.com'],
    [t('helpInfoSystem'), navigator.platform || 'Web'],
    [t('helpInfoUserAgent'), navigator.userAgent],
  ] as const

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpSectionData')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto py-8">
        <GroupedList header={t('helpSystemData')} footer={t('helpDataFooter')}>
          {systemRows.map(([label, value]) => (
            <div key={label} className="px-4 py-3">
              <p className="text-[13px] font-medium text-ios-primary">
                {label}
              </p>
              <p className="mt-0.5 break-all text-[15px] leading-[20px] text-ios-label">
                {value}
              </p>
            </div>
          ))}
        </GroupedList>

        <GroupedList header={t('helpLogs')} className="mt-8">
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12px] leading-[18px] text-ios-secondary-label">
            {DEMO_LOGS.join('\n')}
          </pre>
        </GroupedList>
      </div>
    </div>
  )
}
