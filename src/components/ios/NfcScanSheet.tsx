import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'
import { SFXmark } from '@/components/ios/SF'
import {
  dimVariants,
  iosSpring,
  overlayShellVariants,
  sheetVariants,
  withReducedMotion,
} from '@/lib/iosMotion'

export type NfcSheetState =
  | 'ready'
  | 'reading'
  | 'success'
  | 'error-moved'
  | 'error-timeout'
  | 'error-generic'

type Props = {
  open: boolean
  state: NfcSheetState
  title: string
  body: string
  cancelLabel: string
  onCancel: () => void
  onComplete?: () => void
  /** Fires after the sheet has finished animating out. */
  onClosed?: () => void
}

const BLUE = '#007AFF'
const CLOSE_BG = 'var(--color-ios-gray5)'

/**
 * Core NFC sheet — spacing & colors matched to iOS system sheet.
 * Success uses system blue (not green). Auto-closes after 2.5s on success/error.
 */
export function NfcScanSheet({
  open,
  state,
  title,
  body,
  cancelLabel,
  onCancel,
  onComplete,
  onClosed,
}: Props) {
  const reduced = useReducedMotion() ?? false
  const isError = state.startsWith('error')
  const isSuccess = state === 'success'
  const isBusy = state === 'ready' || state === 'reading'

  const onCancelRef = useRef(onCancel)
  const onCompleteRef = useRef(onComplete)
  const onClosedRef = useRef(onClosed)
  onCancelRef.current = onCancel
  onCompleteRef.current = onComplete
  onClosedRef.current = onClosed

  useEffect(() => {
    if (!open) return
    if (state !== 'success' && !state.startsWith('error')) return

    const id = window.setTimeout(() => {
      if (state === 'success') onCompleteRef.current?.()
      else onCancelRef.current()
    }, 2500)

    return () => window.clearTimeout(id)
  }, [open, state])

  return (
    <AnimatePresence onExitComplete={() => onClosedRef.current?.()}>
      {open ? (
        <motion.div
          key="nfc-sheet"
          className="absolute inset-0 z-[100] flex items-end justify-center pt-12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nfc-sheet-title"
          aria-describedby="nfc-sheet-body"
          variants={overlayShellVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            aria-label={cancelLabel}
            className="absolute inset-0 bg-black/45"
            variants={dimVariants}
            transition={withReducedMotion(reduced, {
              ...iosSpring.soft,
              duration: reduced ? 0.01 : 0.28,
            })}
            onClick={isBusy ? onCancel : undefined}
          />

          <motion.div
            className="relative w-full rounded-t-[var(--radius-ios-sheet)] bg-ios-card px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-7 shadow-[0_-8px_40px_rgba(0,0,0,0.18)]"
            variants={sheetVariants}
            transition={withReducedMotion(reduced, iosSpring.sheet)}
            drag={isBusy ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.55 }}
            onDragEnd={(_, info) => {
              if (!isBusy) return
              if (info.offset.y > 96 || info.velocity.y > 800) onCancel()
            }}
            style={{ willChange: 'transform' }}
          >
            <button
              type="button"
              onClick={onCancel}
              aria-label={cancelLabel}
              className="absolute end-[18px] top-[18px] flex h-[30px] w-[30px] items-center justify-center rounded-full active:opacity-70"
              style={{ backgroundColor: CLOSE_BG }}
            >
              <SFXmark size={12} className="text-ios-secondary-label" aria-hidden />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Fixed copy slot — state changes must not resize the sheet */}
              <div className="relative h-[96px] w-full px-4">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={`${state}-copy`}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={withReducedMotion(reduced, {
                      ...iosSpring.soft,
                      duration: reduced ? 0.01 : 0.18,
                    })}
                    className="absolute inset-x-4 top-0"
                  >
                    <h2
                      id="nfc-sheet-title"
                      className="headline text-[22px] font-bold leading-[28px] text-ios-label"
                    >
                      {title}
                    </h2>
                    <p
                      id="nfc-sheet-body"
                      className="mx-auto mt-2 max-w-[280px] text-[15px] leading-[20px] text-ios-secondary-label"
                    >
                      {body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-12 mb-11 flex h-[152px] w-[152px] items-center justify-center">
                {isBusy ? (
                  <span
                    className={cn(
                      'absolute inset-[-6px] rounded-full border-[2.5px] border-ios-primary/20',
                      state === 'reading' && 'animate-nfc-pulse',
                    )}
                  />
                ) : null}

                <motion.div
                  key={isSuccess ? 'ok' : isError ? 'err' : 'nfc'}
                  initial={reduced ? false : { scale: 0.86, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={withReducedMotion(reduced, iosSpring.snappy)}
                  className="relative z-10 flex h-[152px] w-[152px] items-center justify-center"
                >
                  {isSuccess ? (
                    <SuccessMark />
                  ) : isError ? (
                    <ErrorMark />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-[6px] border-ios-primary bg-ios-card">
                      <PhoneGlyph reading={state === 'reading'} />
                    </div>
                  )}
                </motion.div>
              </div>

              <button
                type="button"
                onClick={onCancel}
                className="h-[50px] w-full rounded-full bg-ios-primary text-[17px] font-medium text-white active:bg-ios-primary-pressed"
              >
                {cancelLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function PhoneGlyph({ reading }: { reading: boolean }) {
  return (
    <svg
      width="100"
      viewBox="0 0 54 50"
      fill="none"
      aria-hidden
      className={cn("mt-5", reading && 'animate-pulse')}
    >
      <rect
        x="4"
        y="2"
        width="46"
        height="84"
        rx="8"
        stroke={BLUE}
        strokeWidth="2"
        fill="transparent"
      />
      <rect x="18" y="8" width="18" height="3" rx="1.5" fill={BLUE} />
    </svg>
  )
}

/** Blue ring + blue check — matches system NFC success. */
function SuccessMark() {
  return (
    <svg width="152" height="152" viewBox="0 0 152 152" fill="none" aria-hidden>
      <circle
        cx="76"
        cy="76"
        r="70"
        stroke={BLUE}
        strokeWidth="7"
        fill="transparent"
      />
      <path
        d="M44 78.5 66 100l44-52"
        stroke={BLUE}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ErrorMark() {
  return (
    <svg width="152" height="152" viewBox="0 0 152 152" fill="none" aria-hidden>
      <circle
        cx="76"
        cy="76"
        r="70"
        stroke="#FF3B30"
        strokeWidth="7"
        fill="transparent"
      />
      <path
        d="M76 46v40M76 108.5h.01"
        stroke="#FF3B30"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}
