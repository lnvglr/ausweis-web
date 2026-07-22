import { NavLink } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nContext'
import { cn } from '@/lib/cn'
import { routes } from '@/lib/routes'
import { SFGearshapeFill, SFWave3RightCircleFill } from '@/components/ios/SF'

const tabs = [
  {
    to: routes.home,
    key: 'tabScan' as const,
    end: true,
    Icon: SFWave3RightCircleFill,
  },
  {
    to: routes.settings,
    key: 'tabSettings' as const,
    Icon: SFGearshapeFill,
  },
]

/** iOS 26 floating Liquid Glass tab bar */
export function TabBar() {
  const { t } = useI18n()

  return (
    <nav
      className="pointer-events-none w-full px-6 pt-2 pb-[max(var(--iphone-17-safe-bottom),env(safe-area-inset-bottom))] bg-ios-grouped"
      aria-label="Tab bar"
    >
      <div
        className={cn(
          'ios-glass pointer-events-auto mx-auto flex max-w-[402px] items-stretch gap-1 rounded-full p-1.5',
        )}
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 transition',
                isActive
                  ? 'bg-ios-fill text-ios-primary'
                  : 'text-ios-label/80',
              )
            }
          >
            {() => (
              <>
                <tab.Icon size={25} aria-hidden />
                <span className="text-[10px] font-medium leading-[12px] tracking-[0.08px]">
                  {t(tab.key)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
