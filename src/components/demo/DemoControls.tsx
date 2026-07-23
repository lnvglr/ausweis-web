import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SFIphoneGen3CropCircle, SFXmark } from '@/components/ios/SF'
import { useAuthRequest } from '@/context/AuthRequestContext'
import { useDemoDirector } from '@/context/DemoDirectorContext'
import { useResetDemo } from '@/hooks/useResetDemo'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

type Variant = 'stage' | 'overlay'

type Props = {
  variant?: Variant
}

/**
 * External demo triggers.
 * - stage: absolute beside / below the phone frame (desktop)
 * - overlay: AssistiveTouch-style expandable control on mobile fullscreen
 */
export function DemoControls({ variant = 'stage' }: Props) {
  const { actions, pinHint } = useDemoDirector()
  const resetDemo = useResetDemo()
  const location = useLocation()
  const { pendingRequest } = useAuthRequest()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)

  const atInitialHome =
    demoRelativePath(location.pathname) === '/' && pendingRequest === null
  const showReset = !atInitialHome
  const showPin = Boolean(pinHint)
  const hasActions = actions.length > 0
  const visible = hasActions || showReset || showPin
  const badgeCount = actions.length

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  if (!visible) return null

  if (variant === 'overlay') {
    return (
      <aside
        ref={rootRef}
        className="pointer-events-none fixed right-3 top-[50vh] z-[60] -translate-y-1/2"
        aria-label="Demo controls"
      >
        <div className="relative">
          <div
            className={cn(
              'pointer-events-auto absolute bottom-0 right-full mr-2 flex w-[min(11.5rem,calc(100vw-4.5rem))] origin-bottom-right flex-col gap-1 rounded-[1.15rem] border border-black/10 bg-black/55 p-1.5 shadow-[0_10px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] dark:border-white/12',
              open
                ? 'translate-x-0 scale-100 opacity-100'
                : 'pointer-events-none translate-x-2 scale-95 opacity-0',
            )}
            aria-hidden={!open}
          >
            {showPin ? (
              <p className="rounded-xl bg-[#007aff]/22 px-2.5 py-2 text-[11px] font-medium leading-snug text-[#9ec9ff]">
                {pinHint}
              </p>
            ) : null}

            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                title={action.detail}
                onClick={() => {
                  action.run()
                  setOpen(false)
                }}
                className={cn(
                  'rounded-xl px-2.5 py-2 text-start text-[12px] font-semibold tracking-[-0.01em] transition active:scale-[0.98]',
                  action.tone === 'danger'
                    ? 'bg-red-500/25 text-red-100 hover:bg-red-500/35'
                    : 'bg-white/10 text-white hover:bg-white/16',
                )}
              >
                <span className="block leading-snug">{action.label}</span>
                {action.detail ? (
                  <span className="mt-0.5 block text-[10px] font-normal leading-snug text-white/45">
                    {action.detail}
                  </span>
                ) : null}
              </button>
            ))}

            {showReset ? (
              <button
                type="button"
                onClick={() => {
                  resetDemo()
                  setOpen(false)
                }}
                className="rounded-xl bg-white/8 px-2.5 py-2 text-start text-[12px] font-semibold tracking-[-0.01em] text-white/70 transition hover:bg-white/14 hover:text-white active:scale-[0.98]"
              >
                Reset demo
              </button>
            ) : null}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close triggers' : 'External triggers'}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              'pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-lg border border-black/10 bg-black/55 text-white shadow-[0_8px_24px_rgba(0,0,0,0.32)] backdrop-blur-xl transition active:scale-95 dark:border-white/15',
              open && 'bg-black/70',
            )}
          >
            {open ? (
              <SFXmark size={16} aria-hidden />
            ) : (
              <SFIphoneGen3CropCircle size={24} aria-hidden />
            )}
            {!open && badgeCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#007aff] px-1 text-[10px] font-bold tabular-nums text-white shadow-sm">
                {badgeCount}
              </span>
            ) : null}
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'pointer-events-none absolute z-40 flex flex-col gap-4',
        // Align with the phone column (spacer is a sibling below the frame)
        'left-0 right-0 top-[calc(100%-11rem)] max-h-44 overflow-y-auto',
        // Beside phone when there is room for frame + gap + panel
        'min-[720px]:left-[calc(100%+1.5rem)] min-[720px]:right-auto min-[720px]:top-1/2 min-[720px]:w-[220px] min-[720px]:max-h-[min(100%,70vh)] min-[720px]:-translate-y-1/2',
      )}
      aria-label="Demo controls"
    >
      {hasActions ? (
        <div className="flex flex-col gap-2">
          <p className="pointer-events-none text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
            Incoming
          </p>
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.run}
              className={cn(
                'pointer-events-auto rounded-2xl border px-4 py-3 text-left shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition active:scale-[0.98]',
                action.tone === 'danger'
                  ? 'border-red-400/25 bg-red-500/15 text-red-100 hover:bg-red-500/25'
                  : 'border-white/12 bg-white/[0.08] text-white/90 hover:bg-white/[0.14]',
              )}
            >
              <span className="block text-[13px] font-semibold leading-snug tracking-[-0.01em]">
                {action.label}
              </span>
              {action.detail ? (
                <span className="mt-0.5 block text-[11px] leading-snug text-white/45">
                  {action.detail}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}

      {showPin ? (
        <p className="pointer-events-none rounded-2xl border border-ios-blue/50 bg-ios-blue/20 px-4 py-3 text-[12px] leading-snug text-ios-blue">
          {pinHint}
        </p>
      ) : null}

      {showReset ? (
        <div className="flex flex-col gap-2">
          {hasActions || showPin ? (
            <p className="pointer-events-none text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
              Demo
            </p>
          ) : null}
          <button
            type="button"
            onClick={resetDemo}
            className="pointer-events-auto rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 text-left text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-white/[0.14] active:scale-[0.98]"
          >
            <span className="block text-[13px] font-semibold leading-snug tracking-[-0.01em]">
              Reset demo
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-white/45">
              Back to idle Scan home
            </span>
          </button>
        </div>
      ) : null}
    </aside>
  )
}
