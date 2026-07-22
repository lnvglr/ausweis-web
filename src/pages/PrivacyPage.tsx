import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { PageIntro } from '@/components/ios/PageChrome'
import { useI18n } from '@/i18n/I18nContext'

export function PrivacyPage() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('privacyTitle')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-10 pt-1">
        <PageIntro title={t('privacyHeading')} body={t('privacyIntro')} />

        <GroupedList header={t('privacyProcessor')} className="mt-8">
          <ListRow
            title="Governikus GmbH & Co. KG"
            subtitle={t('privacyProcessorRole')}
          />
        </GroupedList>

        <GroupedList header={t('privacyStorage')} className="mt-8">
          <p className="px-4 py-3.5 text-[15px] leading-[20px] text-ios-secondary-label">
            {t('privacyNoStorage')}
          </p>
        </GroupedList>

        <GroupedList header={t('privacyContact')} className="mt-8">
          <p className="px-4 py-3.5 text-[15px] leading-[20px] text-ios-secondary-label">
            {t('privacyContactBody')}
          </p>
        </GroupedList>
      </div>
    </div>
  )
}
