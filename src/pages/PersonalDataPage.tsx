import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useNfcDemoActions } from '@/hooks/useNfcDemoActions'
import { useNfcSimulation } from '@/hooks/useNfcSimulation'
import { useI18n } from '@/i18n/I18nContext'
import {
  PERSONAL_DATA_DEMO_VALUES,
  PERSONAL_DATA_FIELDS,
} from '@/lib/personalData'
import { routes } from '@/lib/routes'

type Step = 'intro' | 'scan' | 'pin' | 'results' | 'failed'

export function PersonalDataPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('intro')
  const [sheetOpen, setSheetOpen] = useState(false)

  const nfc = useNfcSimulation({ open: sheetOpen })
  useNfcDemoActions(sheetOpen, nfc.state, nfc)

  const leave = () => navigate(routes.home)

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

  const fieldValue = (key: (typeof PERSONAL_DATA_FIELDS)[number]) => {
    if (key === 'identifyDataAgeOver18') return t('personalDataAgeYes')
    return PERSONAL_DATA_DEMO_VALUES[key] ?? '—'
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
      {step === 'pin' ? (
        <CardPinEntry
          onCancel={leave}
          onSuccess={() => setStep('results')}
          onLocked={() => setStep('failed')}
        />
      ) : (
        <>
          <NavBar
            title={t('personalDataTitle')}
            left={
              <NavBackButton
                label={step === 'results' ? t('commonBack') : t('commonCancel')}
                onClick={leave}
              />
            }
          />

          <div className="flex min-h-0 flex-1 flex-col">
            {step === 'intro' && (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <PageIntro
                    title={t('personalDataIntroTitle')}
                    body={t('personalDataIntroBody')}
                  />

                  <GroupedList
                    header={t('personalDataFieldsHeader')}
                    className="mt-8"
                  >
                    {PERSONAL_DATA_FIELDS.map((key) => (
                      <ListRow
                        key={key}
                        title={t(key)}
                        trailing={
                          <SFCheckmark
                            size={18}
                            className="text-ios-primary"
                            aria-hidden
                          />
                        }
                      />
                    ))}
                  </GroupedList>
                </div>

                <StickyActions>
                  <ActionStack>
                    <IOSButton onClick={() => setStep('scan')}>
                      {t('personalDataContinue')}
                    </IOSButton>
                    <IOSButton variant="plain" onClick={leave}>
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

            {step === 'results' && (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto pb-8">
                  <PageIntro
                    title={t('personalDataResultsTitle')}
                    body={t('personalDataResultsBody')}
                  />
                  <GroupedList className="mt-8">
                    {PERSONAL_DATA_FIELDS.map((key) => (
                      <ListRow
                        key={key}
                        title={t(key)}
                        subtitle={fieldValue(key)}
                        align="top"
                      />
                    ))}
                  </GroupedList>
                </div>
                <StickyActions>
                  <IOSButton onClick={leave}>{t('personalDataDone')}</IOSButton>
                </StickyActions>
              </div>
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
                  <IOSButton onClick={leave}>{t('failHome')}</IOSButton>
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
          setStep('intro')
        }}
        onComplete={() => {
          setStep('pin')
          setSheetOpen(false)
        }}
      />
    </div>
  )
}
