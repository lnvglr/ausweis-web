import { cn } from '@/lib/cn'
import { SFChevronRight } from '@/components/ios/SF'

/**
 * iOS inset grouped list (HIG):
 * - 16pt side margins
 * - Section header aligns with row labels (extra 16pt)
 * - Inset separators between rows (not full-bleed)
 * - Separators owned by the group so Link wrappers don’t hide them
 */
export function GroupedList({
  children,
  footer,
  header,
  className,
  iconInset,
}: {
  children: React.ReactNode
  header?: string
  footer?: React.ReactNode
  className?: string
  /**
   * Align separators with row text after leading icons.
   * - true / "badge": 29pt Settings glyphs
   * - "symbol": 22pt outline symbols (info rows)
   */
  iconInset?: boolean | 'badge' | 'symbol'
}) {
  const insetLeft =
    iconInset === 'symbol'
      ? '[&>*:not(:last-child)]:after:left-[50px]'
      : iconInset
        ? '[&>*:not(:last-child)]:after:left-[60px]'
        : '[&>*:not(:last-child)]:after:left-4'

  return (
    <section className={cn('px-4', className)}>
      {header ? (
        <p className="mb-[7px] px-4 text-[13px] font-normal leading-[18px] text-ios-secondary-label">
          {header}
        </p>
      ) : null}
      <div
        className={cn(
          'overflow-hidden rounded-[var(--radius-ios-grouped)] bg-ios-card',
          '[&>*:not(:last-child)]:relative',
          '[&>*:not(:last-child)]:after:pointer-events-none',
          '[&>*:not(:last-child)]:after:absolute',
          '[&>*:not(:last-child)]:after:bottom-0',
          '[&>*:not(:last-child)]:after:right-0',
          '[&>*:not(:last-child)]:after:h-px',
          '[&>*:not(:last-child)]:after:bg-ios-separator',
          '[&>*:not(:last-child)]:after:content-[""]',
          insetLeft,
        )}
      >
        {children}
      </div>
      {footer ? (
        <p className="mt-[7px] px-4 text-[13px] leading-[18px] text-ios-secondary-label">
          {footer}
        </p>
      ) : null}
    </section>
  )
}

export function ListRow({
  title,
  subtitle,
  detail,
  onClick,
  chevron,
  leading,
  trailing,
  destructive,
  align = 'center',
}: {
  title: string
  subtitle?: string
  detail?: string
  onClick?: () => void
  chevron?: boolean
  leading?: React.ReactNode
  trailing?: React.ReactNode
  destructive?: boolean
  align?: 'center' | 'top'
}) {
  const Comp = onClick ? 'button' : 'div'
  const topAligned = align === 'top'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full text-left',
        topAligned
          ? 'items-start gap-3 px-4 py-4'
          : 'min-h-[48px] items-center gap-[15px] px-4 py-[14px]',
        onClick && 'active:bg-ios-fill/60',
      )}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'text-[17px] leading-[22px] tracking-[-0.2px]',
            topAligned ? 'font-medium' : 'font-normal',
            destructive ? 'text-ios-red' : 'text-ios-label',
          )}
        >
          {title}
        </div>
        {subtitle ? (
          <div className="mt-[3px] text-[15px] leading-[20px] tracking-[-0.24px] text-ios-secondary-label">
            {subtitle}
          </div>
        ) : null}
      </div>
      {detail ? (
        <span className="max-w-[42%] shrink-0 truncate text-[17px] leading-[22px] text-ios-secondary-label">
          {detail}
        </span>
      ) : null}
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
      {chevron ? (
        <SFChevronRight
          size={14}
          className="shrink-0 text-ios-gray3"
          aria-hidden
        />
      ) : null}
    </Comp>
  )
}

/** Leading SF-symbol–style glyph, sized to the 22pt title line. */
export function RowSymbol({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-ios-label">
      {children}
    </span>
  )
}

export function IconBadge({
  color,
  children,
}: {
  color: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex h-[29px] w-[29px] items-center justify-center rounded-[7px] text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  )
}
