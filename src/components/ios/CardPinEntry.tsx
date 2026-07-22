import { useCallback, useState } from 'react'
import { PinPad } from '@/components/ios/PinPad'
import { NavBackButton } from '@/components/ios/NavBar'
import { ScreenTopBar } from '@/components/ios/PageChrome'
import { useSettings } from '@/context/SettingsContext'
import { PinInfoPage } from '@/pages/PinInfoPage'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'

const MAX_ATTEMPTS = 3

type Props = {
  onCancel: () => void
  onSuccess: () => void
  onLocked?: () => void
}

export function CardPinEntry({ onCancel, onSuccess, onLocked }: Props) {
  const { t } = useI18n()
  const { cardPin } = useSettings()
  const [showHelp, setShowHelp] = useState(false)
  const [pin, setPin] = useState('')
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
  const [shake, setShake] = useState(false)
  const [pinError, setPinError] = useState(false)

  const handlePinComplete = useCallback(
    (value: string) => {
      window.setTimeout(() => {
        if (value === cardPin) {
          onSuccess()
          return
        }
        const left = attemptsLeft - 1
        setAttemptsLeft(left)
        setShake(true)
        setPinError(true)
        window.setTimeout(() => setShake(false), 420)
        window.setTimeout(() => {
          setPin('')
          setPinError(false)
          if (left <= 0) {
            if (onLocked) onLocked()
            else onCancel()
          }
        }, 500)
      }, 160)
    },
    [attemptsLeft, cardPin, onSuccess, onLocked, onCancel],
  )

  if (showHelp) {
    return <PinInfoPage onBack={() => setShowHelp(false)} />
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
      <ScreenTopBar
        left={<NavBackButton label={t('commonCancel')} onClick={onCancel} />}
      />

      <div className="flex min-h-0 flex-1 flex-col px-4">
        <div className="flex flex-1 flex-col items-center pt-5">
          <h2
            className={cn(
              'headline max-w-[280px] text-center text-[17px] font-semibold leading-[22px] tracking-[-0.41px]',
              pinError ? 'text-ios-red' : 'text-ios-label',
            )}
          >
            {pinError ? t('pinWrong') : t('pinPrompt')}
          </h2>
          {!pinError && attemptsLeft < MAX_ATTEMPTS ? (
            <p className="mt-2 text-[15px] leading-[20px] text-ios-secondary-label">
              {t('pinAttempts', { n: attemptsLeft })}
            </p>
          ) : null}

          <div className="mt-10 w-full">
            <PinPad
              value={pin}
              onChange={setPin}
              shake={shake}
              onComplete={handlePinComplete}
            />
          </div>
        </div>

        <div className="safe-bottom flex min-h-11 flex-col items-center justify-center gap-2 pb-5 pt-3">
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="flex min-h-11 items-center px-4 text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-ios-label active:opacity-50"
          >
            {t('pinWhatIs')}
          </button>
          <p className="text-[13px] leading-[18px] text-ios-tertiary-label">
            {t('demoPinHint', { pin: cardPin })}
          </p>
        </div>
      </div>
    </div>
  )
}
