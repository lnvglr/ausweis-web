import { Link, useLocation } from 'react-router-dom'
import { AnimatedOutlet } from './AnimatedOutlet'
import { TabBar } from './TabBar'
import { DemoControls } from '@/components/demo/DemoControls'
import { SFXmark } from '@/components/ios/SF'
import { useSettings } from '@/context/SettingsContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useMobileDemo } from '@/hooks/useMobileDemo'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

const FLOW_PATHS = new Set([
  '/identify',
  '/personal-data',
  '/companion',
  '/privacy',
])

/**
 * Demo device shell.
 * - Desktop / wide: iPhone 17 frame with controls beside or below
 * - Mobile / narrow: full-bleed app UI with a minimal demo overlay
 */
export function AppShell() {
  const location = useLocation()
  const path = demoRelativePath(location.pathname)
  const hideTab = FLOW_PATHS.has(path) || path.startsWith('/settings/')
  const { resetToken } = useSettings()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const { rtl, contentLocale } = useI18n()
  const mobile = useMobileDemo()

  const screenClass = cn(
    'relative flex min-h-0 flex-1 flex-col overflow-hidden bg-ios-grouped text-ios-label',
    isDark && 'dark',
    contentLocale === 'ar' &&
      'font-[family-name:var(--font-inter-arabic)] tracking-normal',
  )

  const closeButton = (
    <Link
      to="/"
      aria-label="Close prototype"
      className={cn(
        'z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white/90 backdrop-blur-md transition hover:bg-black/45 hover:text-white active:scale-95',
        mobile
          ? 'fixed right-3 top-[max(10px,env(safe-area-inset-top))]'
          : 'fixed right-3 top-[max(12px,env(safe-area-inset-top))] bg-white/10 text-white/85 hover:bg-white/16 sm:right-5 sm:top-5',
      )}
    >
      <SFXmark size={14} aria-hidden />
    </Link>
  )

  if (mobile) {
    return (
      <div className="demo-fullscreen relative h-full overflow-hidden bg-ios-grouped">
        {closeButton}
        <div
          className={cn(screenClass, 'h-full')}
          dir={rtl ? 'rtl' : 'ltr'}
          lang={contentLocale}
        >
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
        </div>
        <DemoControls variant="overlay" />
      </div>
    )
  }

  return (
    <div className="relative h-full overflow-x-hidden overflow-y-auto bg-[#0b0b0f]">
      {closeButton}

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-auto max-w-full">
          <div
            className={cn(
              'iphone-17-frame relative mx-auto flex w-auto max-w-full flex-col overflow-hidden bg-black',
              'aspect-[402/874]',
              'h-[min(874px,calc(100dvh-2rem-12.5rem))]',
              'min-[720px]:h-[min(874px,calc(100dvh-3rem))]',
              'rounded-[var(--iphone-17-radius)]',
              'shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
              'ring-1 ring-white/12',
            )}
          >
            <div
              className={cn(
                screenClass,
                'm-[3px] rounded-[calc(var(--iphone-17-radius)-3px)]',
              )}
              dir={rtl ? 'rtl' : 'ltr'}
              lang={contentLocale}
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

          <div
            className="pointer-events-none mt-6 h-44 w-full min-[720px]:hidden"
            aria-hidden
          />

          <DemoControls variant="stage" />
        </div>
      </div>
    </div>
  )
}
