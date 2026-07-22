import { cn } from '@/lib/cn'
import { SFChevronBackward } from '@/components/ios/SF'

type Props = {
  title?: string
  largeTitle?: string
  subtitle?: string
  left?: React.ReactNode
  right?: React.ReactNode
  transparent?: boolean
  className?: string
}

/**
 * iOS 26 navigation — transparent bar, floating glass controls, 44pt row.
 * Content scrolls underneath; titles sit in the content layer.
 */
export function NavBar({
  title,
  largeTitle,
  subtitle,
  left,
  right,
  className,
}: Props) {
  return (
    <header className={cn('relative z-20 shrink-0', className)}>
      <div className="safe-top relative flex h-16 items-center px-4 py-4">
        <div className="z-10 flex min-w-11 items-center justify-start">
          {left}
        </div>
        <div className="pointer-events-none absolute inset-x-0 flex justify-center px-16">
          {title && !largeTitle ? (
            <h1 className="truncate text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-ios-label">
              {title}
            </h1>
          ) : null}
        </div>
        <div className="z-10 ml-auto flex min-w-11 items-center justify-end">
          {right}
        </div>
      </div>
      {largeTitle ? (
        <div className="px-4 pb-5 pt-1">
          <h1 className="headline text-[34px] font-bold leading-[41px] tracking-[0.37px] text-ios-label">
            {largeTitle}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-[15px] leading-[20px] text-ios-secondary-label">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

/**
 * iOS 26 Liquid Glass back control — circular glass, 44×44pt.
 */
export function NavBackButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'ios-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
        'text-ios-label transition active:scale-[0.94] active:opacity-90',
      )}
    >
      <SFChevronBackward size={20} aria-hidden />
    </button>
  )
}
