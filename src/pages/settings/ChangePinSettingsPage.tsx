import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupedList, IconBadge, ListRow } from '@/components/ios/GroupedList'
import { IOSButton } from '@/components/ios/IOSButton'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import {
  PageIntro,
  ScreenTopBar,
  StatusScreen,
} from '@/components/ios/PageChrome'
import { PinPad } from '@/components/ios/PinPad'
import { SFCheckmark, SFNosign } from '@/components/ios/SF'
import { useDemoPinHint } from '@/context/DemoDirectorContext'
import { useSettings } from '@/context/SettingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'

type PinKind = 'six' | 'transport'
type Step = 'choose' | 'typesHelp' | 'noPin' | 'current' | 'next' | 'confirm' | 'done'

/** Demo Transport-PIN (5 digits). */
const DEMO_TRANSPORT_PIN = '12345'

export function ChangePinSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { cardPin, setCardPin } = useSettings()

  const [step, setStep] = useState<Step>('choose')
  const [kind, setKind] = useState<PinKind>('six')
  const [value, setValue] = useState('')
  const [pendingPin, setPendingPin] = useState('')
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)

  const currentLength = step === 'current' && kind === 'transport' ? 5 : 6
  const expectedCurrent =
    kind === 'transport' ? DEMO_TRANSPORT_PIN : cardPin

  const demoHint =
    step === 'current' && kind === 'transport'
      ? t('demoTransportPinHint', { pin: DEMO_TRANSPORT_PIN })
      : step === 'current'
        ? t('demoPinHint', { pin: cardPin })
        : null

  useDemoPinHint(demoHint)

  const resetEntry = () => {
    setValue('')

    setError(false)
  }

  const fail = useCallback(() => {
    setShake(true)
    setError(true)
    window.setTimeout(() => setShake(false), 420)
    window.setTimeout(() => resetEntry(), 480)
  }, [])

  const startKind = (next: PinKind) => {
    setKind(next)
    resetEntry()
    setPendingPin('')
    setStep('current')
  }

  const backFromEntry = () => {
    resetEntry()
    setPendingPin('')
    setStep('choose')
  }

  const onComplete = useCallback(
    (pin: string) => {
      window.setTimeout(() => {
        if (step === 'current') {
          if (pin !== expectedCurrent) {
            fail()
            return
          }
          resetEntry()
          setStep('next')
          return
        }
        if (step === 'next') {
          setPendingPin(pin)
          resetEntry()
          setStep('confirm')
          return
        }
        if (step === 'confirm') {
          if (pin !== pendingPin) {
            fail()
            return
          }
          setCardPin(pin)
          setStep('done')
        }
      }, 140)
    },
    [step, expectedCurrent, pendingPin, setCardPin, fail],
  )

  const title =
    step === 'current'
      ? kind === 'transport'
        ? t('settingsChangePinTransportEnter')
        : t('settingsChangePinCurrent')
      : step === 'next'
        ? t('settingsChangePinNew')
        : step === 'confirm'
          ? t('settingsChangePinConfirm')
          : t('settingsChangePinDone')

  if (step === 'choose') {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
        <NavBar
          left={
            <NavBackButton
              label={t('commonBack')}
              onClick={() => navigate(-1)}
            />
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-1">
          <PageIntro
            title={t('settingsChangePin')}
            body={t('settingsChangePinAsk')}
          />

          <GroupedList className="mt-6" iconInset>
            <ListRow
              align="top"
              leading={
                <IconBadge color="#007AFF">
                  <span className="text-[13px] font-bold">6∗</span>
                </IconBadge>
              }
              title={t('settingsChangePinSix')}
              subtitle={t('settingsChangePinSixBody')}
              chevron
              onClick={() => startKind('six')}
            />
            <ListRow
              align="top"
              leading={
                <IconBadge color="#007AFF">
                  <span className="text-[13px] font-bold">5∗</span>
                </IconBadge>
              }
              title={t('settingsChangePinTransport')}
              subtitle={t('settingsChangePinTransportBody')}
              chevron
              onClick={() => startKind('transport')}
            />
            <ListRow
              align="top"
              leading={
                <IconBadge color="#007AFF">
                  <SFNosign size={16} aria-hidden />
                </IconBadge>
              }
              title={t('settingsChangePinNone')}
              subtitle={t('settingsChangePinNoneBody')}
              chevron
              onClick={() => setStep('noPin')}
            />
          </GroupedList>

          <div className="mt-3 px-8">
            <button
              type="button"
              onClick={() => setStep('typesHelp')}
              className="min-h-11 text-left text-[13px] leading-[18px] text-ios-primary active:opacity-60"
            >
              {t('settingsChangePinTypesHelp')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'typesHelp') {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
        <NavBar
          title={t('settingsChangePinTypesHelp')}
          left={
            <NavBackButton
              label={t('commonBack')}
              onClick={() => setStep('choose')}
            />
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
          <PageIntro
            title={t('settingsChangePinTypesHelp')}
            body={t('settingsChangePinTypesBody')}
          />
          <GroupedList className="mt-8">
            <ListRow
              align="top"
              title={t('settingsChangePinSix')}
              subtitle={t('settingsChangePinSixHelp')}
            />
            <ListRow
              align="top"
              title={t('settingsChangePinTransport')}
              subtitle={t('settingsChangePinTransportHelp')}
            />
            <ListRow
              align="top"
              title={t('settingsChangePinNone')}
              subtitle={t('settingsChangePinNoneHelp')}
            />
          </GroupedList>
        </div>
      </div>
    )
  }

  if (step === 'noPin') {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
        <NavBar
          title={t('settingsChangePinNone')}
          left={
            <NavBackButton
              label={t('commonBack')}
              onClick={() => setStep('choose')}
            />
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
          <PageIntro
            title={t('settingsChangePinNone')}
            body={t('settingsChangePinNoneInfo')}
          />
          <div className="mt-8 px-4">
            <IOSButton onClick={() => setStep('choose')}>
              {t('commonBack')}
            </IOSButton>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
        <ScreenTopBar
          left={
            <NavBackButton
              label={t('commonBack')}
              onClick={() => navigate(-1)}
            />
          }
        />
        <StatusScreen className="justify-center pb-16 pt-0">
          <div className="ios-glass flex h-[72px] w-[72px] items-center justify-center rounded-full text-ios-green">
            <SFCheckmark size={36} aria-hidden />
          </div>
          <h2 className="headline mt-6 text-[28px] font-bold leading-[34px] tracking-[0.36px] text-ios-label">
            {t('settingsChangePinDone')}
          </h2>
          <p className="mt-2 max-w-[280px] text-[17px] leading-[22px] text-ios-secondary-label">
            {t('settingsChangePinDoneBody')}
          </p>
          <div className="mt-10 w-full max-w-[320px]">
            <IOSButton onClick={() => navigate(-1)}>{t('commonOk')}</IOSButton>
          </div>
        </StatusScreen>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <ScreenTopBar
        left={
          <NavBackButton label={t('commonCancel')} onClick={backFromEntry} />
        }
      />

      <div className="flex min-h-0 flex-1 flex-col px-4">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center">
            <p className="min-h-[18px] text-[13px] font-normal leading-[18px] text-ios-secondary-label">
              {kind === 'transport'
                ? t('settingsChangePinTransport')
                : t('settingsChangePinSix')}
            </p>
            <h2
              className={cn(
                'headline mt-2 min-h-[22px] max-w-[300px] text-center text-[17px] font-semibold leading-[22px] tracking-[-0.2px]',
                error ? 'text-ios-red' : 'text-ios-label',
              )}
            >
              {error
                ? step === 'confirm'
                  ? t('settingsChangePinMismatch')
                  : t('pinWrong')
                : title}
            </h2>

            <div className="mt-10 w-full">
              <PinPad
                key={`${step}-${currentLength}`}
                value={value}
                onChange={setValue}
                length={currentLength}
                shake={shake}
                onComplete={onComplete}
              />
            </div>
          </div>
        </div>

        <div className="safe-bottom min-h-[18px] pb-5 pt-3" />
      </div>
    </div>
  )
}
