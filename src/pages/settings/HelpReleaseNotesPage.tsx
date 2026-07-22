import { useNavigate } from 'react-router-dom'
import { GroupedList } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useI18n } from '@/i18n/I18nContext'

const releases = [
  {
    version: '1.0.0-demo',
    dateKey: 'helpReleaseDate100' as const,
    userKey: 'helpReleaseUser100' as const,
    devKey: 'helpReleaseDev100' as const,
  },
  {
    version: '0.9.0-demo',
    dateKey: 'helpReleaseDate090' as const,
    userKey: 'helpReleaseUser090' as const,
    devKey: 'helpReleaseDev090' as const,
  },
]

export function HelpReleaseNotesPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpSectionReleaseNotes')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto py-8">
        {releases.map((release, index) => (
          <GroupedList
            key={release.version}
            header={
              index === 0 ? t('helpReleaseNotesHeader') : undefined
            }
            className={index === 0 ? undefined : 'mt-8'}
          >
            <div className="px-4 py-4">
              <h2 className="text-[20px] font-bold leading-[25px] text-ios-primary">
                AusweisApp {release.version}
              </h2>
              <p className="mt-1 text-[13px] text-ios-secondary-label">
                {t('helpReleaseDate')}: {t(release.dateKey)}
              </p>

              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-ios-label underline">
                {t('helpReleaseUser')}
              </p>
              <p className="mt-1.5 text-[15px] leading-[20px] text-ios-secondary-label">
                {t(release.userKey)}
              </p>

              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-ios-label underline">
                {t('helpReleaseDev')}
              </p>
              <p className="mt-1.5 text-[15px] leading-[20px] text-ios-secondary-label">
                {t(release.devKey)}
              </p>
            </div>
          </GroupedList>
        ))}
      </div>
    </div>
  )
}
