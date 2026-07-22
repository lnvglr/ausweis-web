import { useNavigate } from 'react-router-dom'
import { GroupedList } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useI18n } from '@/i18n/I18nContext'

export function HelpLicensePage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('helpSectionLicense')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList header={t('helpLicenseTerms')}>
          <p className="px-4 py-3.5 text-[15px] leading-[20px] text-ios-secondary-label">
            {t('helpLicenseIntro')}
          </p>
        </GroupedList>

        <GroupedList header={t('helpLicenseOverview')} className="mt-8">
          <div className="space-y-3 px-4 py-3.5 text-[15px] leading-[20px] text-ios-label">
            <p>
              <span className="font-semibold">A. </span>
              {t('helpLicenseA')}
            </p>
            <p>
              <span className="font-semibold">B. </span>
              {t('helpLicenseB')}
            </p>
            <p>
              <span className="font-semibold">C. </span>
              {t('helpLicenseC')}
            </p>
          </div>
        </GroupedList>

        <GroupedList header={t('helpLicenseEupl')} className="mt-8">
          <p className="px-4 py-3.5 text-[15px] leading-[20px] text-ios-secondary-label">
            {t('helpLicenseEuplBody')}
          </p>
        </GroupedList>
      </div>
    </div>
  )
}
