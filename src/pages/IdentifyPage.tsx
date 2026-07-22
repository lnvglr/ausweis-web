import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CardPinEntry } from '@/components/ios/CardPinEntry'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { IOSButton } from '@/components/ios/IOSButton'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { NfcScanSheet } from '@/components/ios/NfcScanSheet'
import {
  ActionStack,
  PageIntro,
  StatusScreen,
  StickyActions,
} from '@/components/ios/PageChrome'
import { SFCheckmark } from '@/components/ios/SF'
import { useAuthRequest } from '@/context/AuthRequestContext'
import { useNfcDemoActions } from '@/hooks/useNfcDemoActions'
import { useNfcSimulation } from '@/hooks/useNfcSimulation'
import { useI18n } from '@/i18n/I18nContext'
import { AUTH_REQUESTS } from '@/lib/authRequests'
import { routes } from '@/lib/routes'

type Step = 'consent' | 'scan' | 'pin' | 'done' | 'failed'

const FALLBACK_REQUEST = AUTH_REQUESTS['weinkeller-mobile']

export function IdentifyPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { pendingDefinition, clearAuthRequest } = useAuthRequest()
  const request = pendingDefinition ?? FALLBACK_REQUEST
  const [step, setStep] = useState<Step>('consent')
  const [sheetOpen, setSheetOpen] = useState(false)

  const nfc = useNfcSimulation({ open: sheetOpen })
  useNfcDemoActions(sheetOpen, nfc.state, nfc)

  const leaveIdentify = (toHome = true) => {
    clearAuthRequest()
    if (toHome) navigate(routes.home)
  }

  useEffect(() => {
    if (step === 'scan') setSheetOpen(true)
  }, [step])

  const nfcCopy = useMemo(() => {
    switch (nfc.state) {
      case 'ready':
        return { title: t('nfcReadyTitle'), body: t('nfcReadyBody') }
      case 'reading':
        return { title: t('nfcReadingTitle'), body: t('nfcReadingBody') }
      case 'success':
        return { title: t('nfcSuccessTitle'), body: t('nfcSuccessBody') }
      case 'error-moved':
        return { title: t('nfcErrorTitle'), body: t('nfcErrorMoved') }
      case 'error-timeout':
        return { title: t('nfcErrorTitle'), body: t('nfcErrorTimeout') }
      default:
        return { title: t('nfcErrorTitle'), body: t('nfcErrorGeneric') }
    }
  }, [nfc.state, t])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
      {step === 'pin' ? (
        <CardPinEntry
          onCancel={() => leaveIdentify()}
          onSuccess={() => {
            clearAuthRequest()
            setStep('done')
          }}
          onLocked={() => {
            clearAuthRequest()
            setStep('failed')
          }}
        />
      ) : (
        <>
          <NavBar
            title={t('identifyTitle')}
            left={
              <NavBackButton
                label={t('commonCancel')}
                onClick={() => leaveIdentify()}
              />
            }
          />

          <div className="flex min-h-0 flex-1 flex-col">
            {step === 'consent' && (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <PageIntro
                    title={t('identifyConsentTitle')}
                    body={t('identifyConsentBody')}
                  />

                  <GroupedList header={t('identifyProvider')} className="mt-8">
                    <ListRow
                      title={t(request.providerName)}
                      subtitle={t(request.purpose)}
                    />
                  </GroupedList>

                  <GroupedList header={t('identifyProcessor')} className="mt-8">
                    <ListRow
                      title="Governikus GmbH & Co. KG"
                      subtitle={t('identifyProcessorRole')}
                    />
                  </GroupedList>

                  <GroupedList header={t('identifyData')} className="mt-8">
                    {request.data.map((key) => (
                      <ListRow
                        key={key}
                        title={t(key)}
                        trailing={<CheckIcon />}
                      />
                    ))}
                  </GroupedList>

                  <p className="mt-[7px] px-8 pb-6 text-[13px] leading-[18px] text-ios-secondary-label">
                    {t('identifyNoStorage')}{' '}
                    <Link
                      to={routes.privacy}
                      className="text-ios-primary active:opacity-60"
                    >
                      {t('identifyPrivacyLink')}
                    </Link>
                  </p>
                </div>

                <StickyActions>
                  <ActionStack>
                    <IOSButton onClick={() => setStep('scan')}>
                      {t('identifyContinue')}
                    </IOSButton>
                    <IOSButton variant="plain" onClick={() => leaveIdentify()}>
                      {t('identifyCancel')}
                    </IOSButton>
                  </ActionStack>
                </StickyActions>
              </div>
            )}

            {step === 'scan' && (
              <div className="flex flex-1 flex-col items-center px-4 pt-8">
                <p className="max-w-[280px] text-center text-[17px] leading-[22px] text-ios-secondary-label">
                  {t('placeBody')}
                </p>
              </div>
            )}

            {step === 'done' && (
              <StatusScreen>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ios-green">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 16.5 13.5 22 24 10"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="headline mt-5 text-[22px] font-bold leading-[28px] text-ios-label">
                  {t('successTitle')}
                </h2>
                <div className="mt-8 w-full max-w-[320px]">
                  <IOSButton onClick={() => leaveIdentify()}>
                    {t('successDone')}
                  </IOSButton>
                </div>
              </StatusScreen>
            )}

            {step === 'failed' && (
              <StatusScreen>
                <h2 className="headline text-[22px] font-bold leading-[28px] text-ios-label">
                  {t('pinLocked')}
                </h2>
                <p className="mt-2 max-w-[280px] text-[15px] leading-[20px] text-ios-secondary-label">
                  {t('pinLockedBody')}
                </p>
                <div className="mt-8 w-full max-w-[320px]">
                  <IOSButton onClick={() => leaveIdentify()}>
                    {t('failHome')}
                  </IOSButton>
                </div>
              </StatusScreen>
            )}
          </div>
        </>
      )}

      <NfcScanSheet
        open={sheetOpen}
        state={nfc.state}
        title={nfcCopy.title}
        body={nfcCopy.body}
        cancelLabel={t('nfcCancel')}
        onCancel={() => {
          setSheetOpen(false)
          setStep('consent')
        }}
        onComplete={() => {
          setStep('pin')
          setSheetOpen(false)
        }}
      />
    </div>
  )
}

function CheckIcon() {
  return <SFCheckmark size={18} className="text-ios-primary" aria-hidden />
}
