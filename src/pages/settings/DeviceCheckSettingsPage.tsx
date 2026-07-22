import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { IOSButton } from '@/components/ios/IOSButton'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { NfcScanSheet } from '@/components/ios/NfcScanSheet'
import {
  ActionStack,
  PageIntro,
  StickyActions,
} from '@/components/ios/PageChrome'
import { SFCheckmark } from '@/components/ios/SF'
import { useNfcDemoActions } from '@/hooks/useNfcDemoActions'
import { useNfcSimulation } from '@/hooks/useNfcSimulation'
import { useI18n } from '@/i18n/I18nContext'

type Phase = 'idle' | 'scanning' | 'done'

export function DeviceCheckSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const [sheetOpen, setSheetOpen] = useState(false)

  const nfc = useNfcSimulation({ open: sheetOpen })
  useNfcDemoActions(sheetOpen, nfc.state, nfc)

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

  const startCheck = () => {
    setPhase('scanning')
    setSheetOpen(true)
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('checkTitle')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(-1)}
          />
        }
      />

      <div className="flex min-h-0 flex-1 flex-col">
        {phase === 'done' ? (
          <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
            <PageIntro
              title={t('checkDone')}
              body={t('checkSuccessBody')}
            />

            <GroupedList className="mt-8">
              <ListRow
                title={t('checkNfcOk')}
                trailing={
                  <SFCheckmark size={18} className="text-ios-green" aria-hidden />
                }
              />
              <ListRow
                title={t('checkEidOk')}
                trailing={
                  <SFCheckmark size={18} className="text-ios-green" aria-hidden />
                }
              />
            </GroupedList>

            <div className="mt-8 px-4">
              <ActionStack>
                <IOSButton onClick={startCheck}>{t('checkAgain')}</IOSButton>
                <IOSButton variant="plain" onClick={() => navigate(-1)}>
                  {t('successDone')}
                </IOSButton>
              </ActionStack>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <PageIntro title={t('checkTitle')} body={t('checkBody')} />
              <GroupedList header={t('checkOs')} className="mt-8">
                <ListRow
                  title={t('checkWhatNfc')}
                  subtitle={t('checkWhatNfcBody')}
                  align="top"
                />
                <ListRow
                  title={t('checkWhatEid')}
                  subtitle={t('checkWhatEidBody')}
                  align="top"
                />
              </GroupedList>
            </div>

            <StickyActions>
              <IOSButton onClick={startCheck} disabled={phase === 'scanning'}>
                {t('checkRun')}
              </IOSButton>
            </StickyActions>
          </>
        )}
      </div>

      <NfcScanSheet
        open={sheetOpen}
        state={nfc.state}
        title={nfcCopy.title}
        body={nfcCopy.body}
        cancelLabel={t('nfcCancel')}
        onCancel={() => {
          setSheetOpen(false)
          setPhase('idle')
        }}
        onComplete={() => {
          setPhase('done')
          setSheetOpen(false)
        }}
      />
    </div>
  )
}
