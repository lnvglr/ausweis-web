import { Link } from 'react-router-dom'
import { GroupedList, ListRow, RowSymbol } from '@/components/ios/GroupedList'
import { IOSButton } from '@/components/ios/IOSButton'
import { NavBackButton } from '@/components/ios/NavBar'
import { PageIntro, ScreenTopBar, StickyActions } from '@/components/ios/PageChrome'
import {
  SFBuilding2,
  SFBuildingColumns,
  SFCheckmarkShieldFill,
  SFCreditcard,
  SFEllipsisRectangle,
  SFLockFill,
  SFPersonBadgeKeyFill,
} from '@/components/ios/SF'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'

type Props = {
  onBack: () => void
}

export function PinInfoPage({ onBack }: Props) {
  const { t } = useI18n()

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <ScreenTopBar
        left={<NavBackButton label={t('commonBack')} onClick={onBack} />}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <PageIntro title={t('pinInfoTitle')} body={t('pinInfoIntro')} />

          <GroupedList
            header={t('pinInfoBasics')}
            className="mt-6"
            iconInset="symbol"
          >
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFEllipsisRectangle size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoPoint1Title')}
              subtitle={t('pinInfoPoint1')}
            />
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFCheckmarkShieldFill size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoPoint2Title')}
              subtitle={t('pinInfoPoint2')}
            />
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFCreditcard size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoPoint3Title')}
              subtitle={t('pinInfoPoint3')}
            />
          </GroupedList>

          <GroupedList
            header={t('pinInfoSecurity')}
            className="mt-6"
            iconInset="symbol"
          >
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFBuildingColumns size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoNotBankTitle')}
              subtitle={t('pinInfoNotBank')}
            />
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFLockFill size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoAttemptsTitle')}
              subtitle={t('pinInfoAttempts')}
            />
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFPersonBadgeKeyFill size={20} aria-hidden />
                </RowSymbol>
              }
              title={t('pinInfoForgotTitle')}
              subtitle={t('pinInfoForgot')}
            />
          </GroupedList>

          <GroupedList
            header={t('pinInfoPrivacy')}
            footer={t('pinInfoNoStorage')}
            className="mt-6"
            iconInset="symbol"
          >
            <ListRow
              align="top"
              leading={
                <RowSymbol>
                  <SFBuilding2 size={20} aria-hidden />
                </RowSymbol>
              }
              title="Governikus GmbH & Co. KG"
              subtitle={t('pinInfoProcessorRole')}
            />
          </GroupedList>

          <div className="px-4 pt-2 pb-8">
            <Link
              to={routes.privacy}
              className="inline-flex min-h-11 items-center text-[17px] font-medium tracking-[-0.41px] text-ios-primary active:opacity-60"
            >
              {t('identifyPrivacyLink')}
            </Link>
          </div>
        </div>

        <StickyActions>
          <IOSButton onClick={onBack}>{t('pinInfoGotIt')}</IOSButton>
        </StickyActions>
      </div>
    </div>
  )
}
