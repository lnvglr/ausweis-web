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
import type { DemoAction } from '@/context/DemoDirectorContext'
import { useDemoActions } from '@/context/DemoDirectorContext'
import { usePairings } from '@/context/PairingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'
import { demoRelativePath, routes } from '@/lib/routes'

type Mode = 'pair' | 'use'
type Phase = 'code' | 'ready' | 'pin' | 'done'

const CODE_LENGTH = 4

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
  const companionActive = demoRelativePath(location.pathname) === '/companion'

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

  const completePairingFromMac = useCallback(() => {
    const device = addDevice({
      name: t('companionNewDeviceName'),
      platform: 'macOS',
    })
    setPairedName(device.name)
    setReaderReady(true)
    if (returnTo) {
      navigate(-1)
      return
    }
    setPhase('ready')
  }, [addDevice, t, setReaderReady, returnTo, navigate])

  const requestCardReadFromMac = useCallback(() => {
    if (!readerReady) return
    setPhase('pin')
  }, [readerReady])

  const openManagePairings = useCallback(() => {
    navigate(routes.pairings, {
      state: { from: 'companion' },
    })
  }, [navigate])

  const demoActions = useMemo((): DemoAction[] => {
    if (phase === 'code') {
      return [
        {
          id: 'mac-enter-code',
          label: 'Mac entered pairing code',
          detail: 'Complete pairing from desktop',
          run: completePairingFromMac,
        },
      ]
    }
    if (phase === 'ready' && readerReady) {
      return [
        {
          id: 'mac-card-request',
          label: 'Mac requests card read',
          detail: 'Incoming scan from paired Mac',
          run: requestCardReadFromMac,
        },
      ]
    }
    return []
  }, [phase, readerReady, completePairingFromMac, requestCardReadFromMac])

  useDemoActions(demoActions, companionActive)

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
      <div className="relative flex min-h-0 flex-1 flex-col bg-ios-card">
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
