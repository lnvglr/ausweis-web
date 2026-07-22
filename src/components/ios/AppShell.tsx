import { Link, useLocation } from 'react-router-dom'
import { AnimatedOutlet } from './AnimatedOutlet'
import { TabBar } from './TabBar'
import { DemoControls } from '@/components/demo/DemoControls'
import { SFXmark } from '@/components/ios/SF'
import { useSettings } from '@/context/SettingsContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

const FLOW_PATHS = new Set([
  '/identify',
  '/personal-data',
  '/companion',
  '/privacy',
])

/**
 * Demo device: iPhone 17 logical screen (402 × 874 @3x).
 * Phone stays centered; Incoming controls are absolutely positioned off the
 * frame so appearing/hiding them never shifts the screen.
 */
export function AppShell() {
  const location = useLocation()
  const path = demoRelativePath(location.pathname)
  const hideTab = FLOW_PATHS.has(path) || path.startsWith('/settings/')
  const { resetToken } = useSettings()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <div className="relative h-full overflow-x-hidden overflow-y-auto bg-[#0b0b0f]">
      <Link
        to="/"
        aria-label="Close prototype"
        className="fixed right-3 top-[max(12px,env(safe-area-inset-top))] z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 backdrop-blur-md transition hover:bg-white/16 hover:text-white active:scale-95 sm:right-5 sm:top-5"
      >
        <SFXmark size={14} aria-hidden />
      </Link>

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/*
          Stage sized by the phone. Controls are absolute (no layout impact).
          On narrow viewports a fixed spacer reserves room below so the panel
          is reachable without shifting the phone when it appears.
        */}
        <div className="relative w-auto max-w-full">
          <div
            className={cn(
              'iphone-17-frame relative mx-auto flex w-auto max-w-full flex-col overflow-hidden bg-black',
              'aspect-[402/874]',
              // Narrow: leave headroom for Incoming dock (gap + panel)
              'h-[min(874px,calc(100dvh-2rem-12.5rem))]',
              // Wide: controls sit beside — use full available height
              'min-[720px]:h-[min(874px,calc(100dvh-3rem))]',
              'rounded-[var(--iphone-17-radius)]',
              'shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
              'ring-1 ring-white/12',
            )}
          >
            <div
              className={cn(
                'relative m-[3px] flex min-h-0 flex-1 flex-col overflow-hidden bg-ios-grouped text-ios-label',
                'rounded-[calc(var(--iphone-17-radius)-3px)]',
                isDark && 'dark',
              )}
            >
              <div
                className="pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 bg-black"
                style={{
                  top: 'var(--iphone-17-island-top)',
                  width: 'var(--iphone-17-island-width)',
                  height: 'var(--iphone-17-island-height)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.85)',
                }}
                aria-hidden
              />

              <div className="relative flex min-h-0 flex-1 flex-col">
                <AnimatedOutlet key={resetToken} />
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 z-30 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    hideTab
                      ? 'pointer-events-none invisible translate-y-3 opacity-0'
                      : 'translate-y-0 opacity-100',
                  )}
                  aria-hidden={hideTab}
                  inert={hideTab || undefined}
                >
                  <TabBar />
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-[8px] left-1/2 z-40 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ios-label/25"
                aria-hidden
              />
            </div>
          </div>

          {/* Layout-only: keeps absolute-below controls inside the scroll/center box */}
          <div
            className="pointer-events-none mt-6 h-44 w-full min-[720px]:hidden"
            aria-hidden
          />

          <DemoControls />
        </div>
      </div>
    </div>
  )
}
