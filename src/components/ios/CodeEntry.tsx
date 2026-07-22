import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import { SFDeleteLeft } from '@/components/ios/SF'

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
] as const

type BoxesProps = {
  value: string
  length?: number
  /** Insert a separator before this index (e.g. 2 → XX-XX). */
  splitAt?: number
}

export function CodeBoxes({ value, length = 4, splitAt }: BoxesProps) {
  const gapIndex = splitAt ?? (length === 6 ? 3 : length === 4 ? 2 : -1)
  const activeIndex = Math.min(value.length, length - 1)

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }).map((_, i) => {
        const digit = value[i] ?? ''
        const isActive = i === activeIndex && value.length < length
        const showCursor = isActive && !digit

        return (
          <div key={i} className="contents">
            {i === gapIndex ? (
              <span className="px-0.5 text-[22px] font-medium text-ios-gray2">
                –
              </span>
            ) : null}
            <div
              className={cn(
                'relative flex h-[52px] w-[48px] items-center justify-center rounded-[var(--radius-ios-control)] bg-ios-gray6 text-[24px] font-semibold text-ios-label',
                isActive && 'ring-2 ring-ios-primary/30',
              )}
            >
              {digit}
              {showCursor ? (
                <span className="absolute inset-y-3 left-1/2 w-[2px] -translate-x-1/2 animate-pulse rounded-full bg-ios-primary" />
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type PadProps = {
  value: string
  onChange: (next: string) => void
  onComplete?: (code: string) => void
  length?: number
}

export function CodePad({
  value,
  onChange,
  onComplete,
  length = 4,
}: PadProps) {
  const done = useRef('')

  useEffect(() => {
    if (value.length === length && value !== done.current) {
      done.current = value
      onComplete?.(value)
    }
    if (value.length < length) done.current = ''
  }, [value, length, onComplete])

  const press = (key: string) => {
    if (key === 'del') {
      onChange(value.slice(0, -1))
      return
    }
    if (value.length >= length) return
    onChange(value + key)
  }

  return (
    <div className="mx-auto grid w-full max-w-[360px] grid-cols-3 gap-y-1">
      {KEYS.flat().map((key, idx) => {
        if (key === '') return <div key={idx} />
        const isDel = key === 'del'
        return (
          <button
            key={idx}
            type="button"
            onClick={() => press(key)}
            className="flex h-14 min-h-11 items-center justify-center rounded-[var(--radius-ios-xl)] text-[34px] font-light text-ios-label active:bg-ios-fill"
            aria-label={isDel ? 'Delete' : key}
          >
            {isDel ? <SFDeleteLeft size={26} aria-hidden /> : key}
          </button>
        )
      })}
    </div>
  )
}

/** Format a numeric code for display, e.g. 4829 → 48-29 */
export function formatCodeDisplay(code: string, splitAt = 2) {
  if (code.length <= splitAt) return code
  return `${code.slice(0, splitAt)}-${code.slice(splitAt)}`
}

export function randomPairingCode(length = 4) {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += Math.floor(Math.random() * 10).toString()
  }
  return out
}
