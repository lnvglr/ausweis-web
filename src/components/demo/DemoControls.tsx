import { useLocation } from 'react-router-dom'
import { useAuthRequest } from '@/context/AuthRequestContext'
import { useDemoDirector } from '@/context/DemoDirectorContext'
import { useResetDemo } from '@/hooks/useResetDemo'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

/**
 * Absolutely positioned off the phone stage so the phone never shifts.
 * - Narrow (<720px): in the reserved dock below the frame
 * - Wide: to the right of the frame with a fixed 1.5rem gap
 *
 * Reset is hidden on idle Scan home. Demo PIN only while a PIN pad is up.
 */
export function DemoControls() {
  const { actions, pinHint } = useDemoDirector()
  const resetDemo = useResetDemo()
  const location = useLocation()
  const { pendingRequest } = useAuthRequest()

  const atInitialHome =
    demoRelativePath(location.pathname) === '/' && pendingRequest === null
  const showReset = !atInitialHome
  const showPin = Boolean(pinHint)

  if (actions.length === 0 && !showReset && !showPin) return null

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
      {actions.length > 0 ? (
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
        <p className="pointer-events-none text-[12px] leading-snug text-ios-blue bg-ios-blue/20 rounded-2xl border border-ios-blue/50 px-4 py-3">
          {pinHint}
        </p>
      ) : null}

      {showReset ? (
        <div className="flex flex-col gap-2">
          {actions.length > 0 || showPin ? (
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
