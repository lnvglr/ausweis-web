import { cn } from '@/lib/cn'

/**
 * iOS 26 UISwitch — wider track, on/off glyphs, soft thumb.
 * Approx. 63×31 (classic is 51×31).
 */
export function IOSSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChange(!checked)
      }}
      className={cn(
        'relative isolate h-[31px] w-[68px] shrink-0 rounded-full p-0',
        'appearance-none border-0 outline-none',
        'transition-[background,box-shadow] duration-300',
        'ease-[cubic-bezier(0.22,1,0.36,1)]',
        'ios-mirror-rtl',
        checked
          ? 'bg-[#34c759] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.06)]'
          : 'bg-[#787880]/16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.04)]',
        disabled && 'opacity-40',
      )}
    >
      {/* Track sheen */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full',
          checked
          ? 'bg-[#34c759]'
          : 'bg-[#787880]/16',
          !checked && 'opacity-60',
        )}
      />


      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-[2px] left-[2px]',
          'block h-[27px] w-[42px] rounded-full bg-white',
          'shadow-[0_3px_8px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.16),0_0_0_0.5px_rgba(0,0,0,0.04)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'will-change-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0',
        )}
      >
        <span
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_42%,rgba(0,0,0,0.03)_100%)]',
          )}
        />
      </span>
    </button>
  )
}
