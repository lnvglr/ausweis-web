import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useSettings } from '@/context/SettingsContext'
import { SFDeleteLeft } from '@/components/ios/SF'

type Props = {
  value: string
  onChange: (next: string) => void
  length?: number
  disabled?: boolean
  shake?: boolean
  onComplete?: (pin: string) => void
}

const DEFAULT_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function shuffleDigits(): string[] {
  const digits = [...DEFAULT_DIGITS]
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[digits[i], digits[j]] = [digits[j], digits[i]]
  }
  return digits
}

export function PinPad({
  value,
  onChange,
  length = 6,
  disabled,
  shake,
  onComplete,
}: Props) {
  const { haptics, randomizeKeys, hideKeyAnimations } = useSettings()
  const [popIndex, setPopIndex] = useState<number | null>(null)
  const [digits, setDigits] = useState(DEFAULT_DIGITS)
  const completedRef = useRef('')

  useEffect(() => {
    if (!randomizeKeys) {
      setDigits(DEFAULT_DIGITS)
      return
    }
    if (value.length === 0) {
      setDigits(shuffleDigits())
    }
  }, [randomizeKeys, value.length])

  const keys = useMemo(
    () =>
      [
        [digits[0], digits[1], digits[2]],
        [digits[3], digits[4], digits[5]],
        [digits[6], digits[7], digits[8]],
        ['', '0', 'del'],
      ] as const,
    [digits],
  )

  useEffect(() => {
    if (value.length === length && value !== completedRef.current) {
      completedRef.current = value
      onComplete?.(value)
    }
    if (value.length < length) completedRef.current = ''
  }, [value, length, onComplete])

  const press = (key: string) => {
    if (disabled) return
    if (key === 'del') {
      onChange(value.slice(0, -1))
      return
    }
    if (value.length >= length) return
    const next = value + key
    if (haptics && !hideKeyAnimations) setPopIndex(next.length - 1)
    onChange(next)
  }

  useEffect(() => {
    if (popIndex === null) return
    const id = window.setTimeout(() => setPopIndex(null), 180)
    return () => window.clearTimeout(id)
  }, [popIndex])

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="mb-10 flex items-center gap-[14px]"
        style={
          shake
            ? {
                animation:
                  'shake-x 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
              }
            : undefined
        }
      >
        {Array.from({ length }).map((_, i) => {
          const filled = i < value.length
          return (
            <span
              key={i}
              className={cn(
                'h-[13px] w-[13px] rounded-full transition-colors duration-100',
                filled ? 'bg-ios-label' : 'bg-ios-gray4',
                popIndex === i && !hideKeyAnimations && 'animate-pin-pop',
              )}
            />
          )
        })}
      </div>

      <div className="grid w-full max-w-[320px] grid-cols-3 gap-x-6 gap-y-4">
        {keys.flat().map((key, idx) => {
          if (key === '') return <div key={idx} className="h-[75px] w-[75px]" />
          const isDelete = key === 'del'
          return (
            <button
              key={`${key}-${idx}`}
              type="button"
              disabled={disabled}
              onClick={() => press(key)}
              className={cn(
                'mx-auto flex h-[75px] w-[75px] items-center justify-center rounded-full',
                'bg-ios-gray5 text-[28px] font-normal leading-none tracking-tight text-ios-label',
                'transition-colors active:bg-ios-gray4 disabled:opacity-40',
              )}
              aria-label={isDelete ? 'Delete' : key}
            >
              {isDelete ? (
                <SFDeleteLeft size={28} aria-hidden />
              ) : (
                key
              )}
            </button>
          )
        })}
      </div>

      <style>{`
        @keyframes shake-x {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
