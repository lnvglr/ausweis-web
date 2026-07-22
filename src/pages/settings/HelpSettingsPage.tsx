import { Link, useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useI18n } from '@/i18n/I18nContext'

const sections = [
  { to: '/settings/help/general', key: 'helpSectionGeneral' as const },
  { to: '/settings/help/data', key: 'helpSectionData' as const },
  { to: '/settings/help/information', key: 'helpSectionInformation' as const },
  { to: '/settings/help/license', key: 'helpSectionLicense' as const },
  { to: '/settings/help/release-notes', key: 'helpSectionReleaseNotes' as const },
]

export function HelpSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpTitle')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList footer={t('helpHubFooter')}>
          {sections.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="block active:bg-ios-fill/60"
            >
              <ListRow title={t(section.key)} chevron />
            </Link>
          ))}
        </GroupedList>
      </div>
    </div>
  )
}
