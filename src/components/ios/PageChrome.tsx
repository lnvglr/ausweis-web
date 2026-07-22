import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { SFCheckmark } from '@/components/ios/SF'

/** Standard 16pt content inset + large title block (HIG). */
export function PageIntro({
  title,
  body,
  className,
}: {
  title: string
  body?: string
  className?: string
}) {
  return (
    <div className={cn('px-4 pt-8', className)}>
      <h1 className="headline text-[28px] font-bold leading-[34px] tracking-[0.36px] text-ios-label">
        {title}
      </h1>
      {body ? (
        <p className="mt-2 text-[15px] leading-[20px] tracking-[-0.24px] text-ios-secondary-label">
          {body}
        </p>
      ) : null}
    </div>
  )
}

/** Floating glass back / action row — matches NavBar horizontal inset. */
export function ScreenTopBar({
  left,
  right,
  className,
}: {
  left?: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'safe-top relative z-20 flex h-11 shrink-0 items-center px-4',
        className,
      )}
    >
      <div className="flex min-w-11 items-center justify-start">{left}</div>
      <div className="ml-auto flex min-w-11 items-center justify-end">{right}</div>
    </div>
  )
}

/** Bottom action dock for Continue / Got it / Cancel. */
export function StickyActions({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'safe-bottom shrink-0 border-t border-ios-separator/60 bg-ios-grouped/90 px-4 pb-3 pt-3 backdrop-blur-xl rounded-b-[var(--iphone-17-radius)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Vertical stack for primary + plain secondary actions. */
export function ActionStack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

/** Centered status screen (success / locked / pairing wait). */
export function StatusScreen({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center px-4 pt-14 text-center',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** System checkmark for selected list options. */
export function SelectionCheck() {
  return (
    <SFCheckmark size={18} className="shrink-0 text-ios-primary" aria-hidden />
  )
}
