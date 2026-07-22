import { Link, useLocation } from 'react-router-dom'
import { AnimatedOutlet } from './AnimatedOutlet'
import { TabBar } from './TabBar'
import { SFXmark } from '@/components/ios/SF'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

const FLOW_PATHS = new Set(['/identify', '/companion', '/privacy'])

export function AppShell() {
  const location = useLocation()
  const path = demoRelativePath(location.pathname)
  const hideTab = FLOW_PATHS.has(path) || path.startsWith('/settings/')

  return (
    <div className="relative flex h-full items-center justify-center bg-[#0b0b0f] p-0 sm:p-6">
      <Link
        to="/"
        aria-label="Close prototype"
        className="absolute right-3 top-[max(12px,env(safe-area-inset-top))] z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 backdrop-blur-md transition hover:bg-white/16 hover:text-white active:scale-95 sm:right-5 sm:top-5"
      >
        <SFXmark size={14} aria-hidden />
      </Link>

      <div
        className={cn(
          'relative flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-ios-grouped shadow-none sm:h-[min(874px,100%)] sm:rounded-[44px] sm:border sm:border-white/10 sm:shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
        )}
      >
        <div className="pointer-events-none absolute left-1/2 top-2 z-40 hidden h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-black sm:block" />
        <div className="relative flex min-h-0 flex-1 flex-col">
          <AnimatedOutlet />
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
    </div>
  )
}
