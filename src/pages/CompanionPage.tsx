import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { randomPairingCode } from '@/components/ios/CodeEntry'
import { CardPinEntry } from '@/components/ios/CardPinEntry'
import { IOSButton } from '@/components/ios/IOSButton'
import { IOSSwitch } from '@/components/ios/IOSSwitch'
import { NavBackButton } from '@/components/ios/NavBar'
import {
  PageIntro,
  ScreenTopBar,
  StatusScreen,
} from '@/components/ios/PageChrome'
import { SFCheckmark, SFMacbook } from '@/components/ios/SF'
import { usePairings } from '@/context/PairingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'

type Mode = 'pair' | 'use'
type Phase = 'code' | 'ready' | 'pin' | 'done'

const CODE_LENGTH = 4
/** Demo: Mac enters the pairing code shown on this phone. */
const PAIRING_COMPLETE_DELAY_MS = 3500
/** Demo: Mac requests a card read after the phone is ready. */
const MAC_REQUEST_DELAY_MS = 2800

type LocationState = {
  quick?: boolean
  mode?: Mode
  returnTo?: string
}

export function CompanionPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LocationState | null) ?? null
  const mode: Mode = state?.mode === 'pair' ? 'pair' : 'use'
  const returnTo = state?.returnTo

  const {
    devices,
    addDevice,
    primaryDevice,
    readerReady,
    setReaderReady,
  } = usePairings()

  const pairingCode = useMemo(() => randomPairingCode(CODE_LENGTH), [])
  const needsPairing = mode === 'pair' || devices.length === 0

  const [phase, setPhase] = useState<Phase>(() =>
    needsPairing ? 'code' : 'ready',
  )
  /** Only auto-demo a Mac scan request after a fresh pairing, not on every ready visit. */
  const [demoScanPending, setDemoScanPending] = useState(false)
  const [pairedName, setPairedName] = useState(
    () => primaryDevice?.name ?? t('companionNewDeviceName'),
  )

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  // Entering ready with a pairing marks the phone available.
  useEffect(() => {
    if (phase !== 'ready' || devices.length === 0) return
    setReaderReady(true)
    if (primaryDevice) setPairedName(primaryDevice.name)
  }, [phase, devices.length, primaryDevice, setReaderReady])

  // After a fresh pairing, simulate an incoming Mac scan request → PIN.
  useEffect(() => {
    if (phase !== 'ready' || !demoScanPending || !readerReady) return
    const id = window.setTimeout(() => {
      setDemoScanPending(false)
      setPhase('pin')
    }, MAC_REQUEST_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [phase, demoScanPending, readerReady])

  // Demo: Mac enters the displayed code after a short wait.
  useEffect(() => {
    if (phase !== 'code') return
    const id = window.setTimeout(() => {
      const device = addDevice({
        name: t('companionNewDeviceName'),
        platform: 'macOS',
      })
      setPairedName(device.name)
      setReaderReady(true)
      if (returnTo) {
        // Pop back to the screen that started pairing (correct back animation).
        navigate(-1)
        return
      }
      setDemoScanPending(true)
      setPhase('ready')
    }, PAIRING_COMPLETE_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [phase, addDevice, t, setReaderReady, returnTo, navigate])

  const openManagePairings = useCallback(() => {
    setDemoScanPending(false)
    navigate('/settings/pairings', {
      state: { from: 'companion' },
    })
  }, [navigate])

  if (phase === 'pin') {
    return (
      <CardPinEntry
        onCancel={() => setPhase('ready')}
        onSuccess={() => setPhase('done')}
        onLocked={() => setPhase('ready')}
      />
    )
  }

  if (phase === 'code') {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col bg-white">
        <ScreenTopBar
          left={
            <NavBackButton label={t('commonCancel')} onClick={goBack} />
          }
        />

        <PageIntro
          title={t('companionCodeTitle')}
          body={t('companionCodeBody')}
        />

        <div className="mt-12 flex flex-col items-center px-4">
          <p className="text-[15px] font-semibold leading-[20px] text-ios-secondary-label">
            {t('companionCodeLabel')}
          </p>
          <p
            className="mt-3 text-[48px] font-semibold leading-none tracking-[0.04em] text-ios-label"
            aria-live="polite"
          >
            {pairingCode}
          </p>
          <p className="mt-5 text-[15px] text-ios-tertiary-label">
            {t('companionWaiting')}
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-5 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-10">
          <IOSButton variant="primary" onClick={goBack}>
            {t('companionCancelPairing')}
          </IOSButton>
          <p className="max-w-[300px] text-center text-[13px] leading-[18px] text-ios-tertiary-label">
            {t('companionNetworkNotice')}
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
        <ScreenTopBar
          left={
            <NavBackButton
              label={t('commonBack')}
              onClick={() => setPhase('ready')}
            />
          }
        />
        <StatusScreen>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ios-green">
            <SFCheckmark size={32} className="text-white" aria-hidden />
          </div>
          <h2 className="headline mt-5 text-[22px] font-bold leading-[28px] text-ios-label">
            {t('companionAuthDone')}
          </h2>
          <p className="mt-2 max-w-[320px] text-[15px] leading-[20px] text-ios-secondary-label">
            {t('companionAuthDoneBody')}
          </p>
          <div className="mt-8 w-full max-w-[320px]">
            <IOSButton onClick={() => setPhase('ready')}>
              {t('companionBackToReady')}
            </IOSButton>
          </div>
        </StatusScreen>
      </div>
    )
  }

  // Ready standby — phone is available as card reader for the paired Mac.
  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <ScreenTopBar
        left={<NavBackButton label={t('commonBack')} onClick={goBack} />}
      />

      <div className="flex min-h-0 flex-1 flex-col pb-8">
        <PageIntro
          title={t('companionTitle')}
          body={t('companionReadyBody')}
        />

        <div className="mt-8 px-4">
          <div className="overflow-hidden rounded-[var(--radius-ios-grouped)] bg-ios-card">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-ios-control)] bg-[#5856D6]/12 text-[#5856D6]">
                <SFMacbook size={22} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[17px] leading-[22px] tracking-[-0.41px] text-ios-label">
                  {pairedName}
                </p>
                <p className="text-[13px] leading-[18px] text-ios-secondary-label">
                  {t('companionCoupledLabel')}
                </p>
              </div>
            </div>

            <div
              className="flex items-center justify-between gap-3 px-4 py-3.5"
              style={{ boxShadow: 'inset 0 0.5px 0 rgba(60, 60, 67, 0.12)' }}
            >
              <div className="min-w-0">
                <p className="text-[17px] leading-[22px] tracking-[-0.41px] text-ios-label">
                  {t('companionReadyToggle')}
                </p>
                <p className="mt-0.5 text-[13px] leading-[18px] text-ios-secondary-label">
                  {t('companionReadyToggleBody')}
                </p>
              </div>
              <IOSSwitch checked={readerReady} onChange={setReaderReady} />
            </div>
          </div>
        </div>

        <div
          className={cn(
            'mt-8 flex items-center justify-center gap-2 text-[15px]',
            readerReady ? 'text-ios-green' : 'text-ios-secondary-label',
          )}
        >
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              readerReady ? 'bg-ios-green' : 'bg-ios-gray3',
            )}
          />
          {readerReady ? t('companionIdle') : t('companionNotReady')}
        </div>

        {readerReady ? (
          <p className="mt-3 px-4 text-center text-[13px] leading-[18px] text-ios-tertiary-label">
            {t('companionWaitingForMac')}
          </p>
        ) : null}

        <div className="mt-auto px-4 pt-8">
          <IOSButton variant="plain" onClick={openManagePairings}>
            {t('settingsManagePairings')}
          </IOSButton>
        </div>
      </div>
    </div>
  )
}
