import { Link, useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useI18n } from '@/i18n/I18nContext'

const EXTERNAL = {
  privacy: 'https://www.ausweisapp.bund.de/datenschutz',
  accessibility: 'https://www.ausweisapp.bund.de/barrierefreiheit',
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function HelpInformationPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const infoRows = [
    [t('helpInfoApplication'), 'AusweisApp'],
    [t('helpInfoVersion'), '1.0.0-demo'],
    [t('helpInfoOrganization'), 'Governikus GmbH & Co. KG'],
    [t('helpInfoDomain'), 'governikus.com'],
            [t('helpInfoSystem'), navigator.platform || 'Web'],
            [
              t('helpInfoArchitecture'),
              /Mac|iPhone|iPad|Android|Win|Linux/i.exec(navigator.userAgent)?.[0] ??
                'browser',
            ],
  ] as const

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpSectionInformation')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList>
          <Link to="/privacy" className="block active:bg-ios-fill/60">
            <ListRow title={t('helpPrivacyStatement')} chevron />
          </Link>
          <ListRow
            title={t('helpPrivacyWebsite')}
            onClick={() => openExternal(EXTERNAL.privacy)}
            trailing={<ExternalChip label={t('helpOpenWebsite')} />}
          />
          <ListRow
            title={t('helpAccessibility')}
            onClick={() => openExternal(EXTERNAL.accessibility)}
            trailing={<ExternalChip label={t('helpOpenWebsite')} />}
          />
        </GroupedList>

        <GroupedList header={t('helpAppInfo')} className="mt-8">
          {infoRows.map(([label, value]) => (
            <div key={label} className="px-4 py-3">
              <p className="text-[13px] font-medium text-ios-primary">
                {label}
              </p>
              <p className="mt-0.5 text-[15px] leading-[20px] text-ios-label">
                {value}
              </p>
            </div>
          ))}
        </GroupedList>
      </div>
    </div>
  )
}

function ExternalChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-ios-primary px-3 py-1.5 text-[13px] font-medium text-white">
      {label}
    </span>
  )
}
