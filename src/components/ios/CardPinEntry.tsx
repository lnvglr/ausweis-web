import { useCallback, useState } from 'react'
import { PinPad } from '@/components/ios/PinPad'
import { NavBackButton } from '@/components/ios/NavBar'
import { ScreenTopBar } from '@/components/ios/PageChrome'
import { useDemoPinHint } from '@/context/DemoDirectorContext'
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

  useDemoPinHint(showHelp ? null : t('demoPinHint', { pin: cardPin }))

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
    <div className="relative flex min-h-0 flex-1 flex-col bg-ios-card">
      <ScreenTopBar
        left={<NavBackButton label={t('commonCancel')} onClick={onCancel} />}
      />

      <div className="flex min-h-0 flex-1 flex-col px-4">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center">
            <h2
              className={cn(
                'headline max-w-[280px] text-center text-[17px] font-semibold leading-[22px] tracking-[-0.2px]',
                pinError ? 'text-ios-red' : 'text-ios-label',
              )}
            >
              {pinError ? t('pinWrong') : t('pinPrompt')}
            </h2>
            {/* Fixed-height note slot — avoids layout shift when attempts appear. */}
            <p
              className={cn(
                'mt-2 min-h-[20px] text-center text-[15px] leading-[20px]',
                !pinError && attemptsLeft < MAX_ATTEMPTS
                  ? 'text-ios-secondary-label'
                  : 'text-transparent',
              )}
              aria-hidden={pinError || attemptsLeft >= MAX_ATTEMPTS}
            >
              {!pinError && attemptsLeft < MAX_ATTEMPTS
                ? t('pinAttempts', { n: attemptsLeft })
                : '\u00a0'}
            </p>

            <div className="mt-10 w-full">
              <PinPad
                value={pin}
                onChange={setPin}
                shake={shake}
                onComplete={handlePinComplete}
              />
            </div>
          </div>
        </div>

        <div className="safe-bottom flex min-h-11 flex-col items-center justify-center pb-5 pt-3">
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="flex min-h-11 items-center px-4 text-[17px] font-normal leading-[22px] tracking-[-0.2px] text-ios-label active:opacity-50"
          >
            {t('pinWhatIs')}
          </button>
        </div>
      </div>
    </div>
  )
}
