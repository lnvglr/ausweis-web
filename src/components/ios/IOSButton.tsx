import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { iosSpring } from '@/lib/iosMotion'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'destructive' | 'plain' | 'tinted'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

/**
 * Primary actions always use --color-ios-primary (#007AFF).
 * Capsule shape (iOS 26).
 */
export function IOSButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  className,
  type = 'button',
}: Props) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={iosSpring.press}
      className={cn(
        'inline-flex h-[50px] min-h-11 w-full items-center justify-center rounded-full px-5',
        'text-[17px] font-medium leading-[22px] tracking-[-0.2px] disabled:opacity-40',
        variant === 'primary' &&
          'bg-ios-primary text-white active:bg-ios-primary-pressed',
        variant === 'tinted' && 'bg-ios-primary/12 text-ios-primary',
        variant === 'secondary' && 'ios-glass text-ios-label',
        variant === 'destructive' && 'bg-ios-red/12 text-ios-red',
        variant === 'plain' &&
          'h-auto min-h-11 bg-transparent font-medium text-ios-primary shadow-none',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
