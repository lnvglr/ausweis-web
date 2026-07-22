import { useNavigate } from 'react-router-dom'
import { GroupedList, ListRow } from '@/components/ios/GroupedList'
import { IOSSwitch } from '@/components/ios/IOSSwitch'
import { NavBackButton, NavBar } from '@/components/ios/NavBar'
import { useSettings } from '@/context/SettingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { useColorScheme, usePrefersDark } from '@/hooks/useColorScheme'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/cn'
import { SFCheckmark } from '@/components/ios/SF'

export function AppearanceSettingsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { appearance, setAppearance } = useSettings()
  const systemDark = usePrefersDark()
  const selected = useColorScheme()

  const automatic = appearance === 'system'

  const setAutomatic = (on: boolean) => {
    if (on) {
      setAppearance('system')
      return
    }
    setAppearance(systemDark ? 'dark' : 'light')
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar
        title={t('settingsAppearance')}
        left={
          <NavBackButton
            label={t('commonBack')}
            onClick={() => navigate(routes.settings)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8 pt-4">
        <GroupedList>
          <div className="flex justify-center gap-10 px-4 pb-5 pt-6">
            <AppearanceChoice
              label={t('settingsAppearanceLight')}
              selected={selected === 'light'}
              mode="light"
              onSelect={() => setAppearance('light')}
            />
            <AppearanceChoice
              label={t('settingsAppearanceDark')}
              selected={selected === 'dark'}
              mode="dark"
              onSelect={() => setAppearance('dark')}
            />
          </div>

          <ListRow
            title={t('settingsAppearanceSystem')}
            trailing={
              <IOSSwitch checked={automatic} onChange={setAutomatic} />
            }
          />
        </GroupedList>
      </div>
    </div>
  )
}

function AppearanceChoice({
  label,
  selected,
  mode,
  onSelect,
}: {
  label: string
  selected: boolean
  mode: 'light' | 'dark'
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-2.5 active:opacity-80"
    >
      <PhonePreview mode={mode} selected={selected} />
      <span className="text-[13px] font-normal leading-[18px] text-ios-label">
        {label}
      </span>
      <RadioMark selected={selected} />
    </button>
  )
}

function RadioMark({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ios-primary text-white">
        <SFCheckmark size={12} aria-hidden />
      </span>
    )
  }

  return (
    <span
      className="block h-[22px] w-[22px] rounded-full border-[1.5px] border-ios-gray3"
      aria-hidden
    />
  )
}

function PhonePreview({
  mode,
  selected,
}: {
  mode: 'light' | 'dark'
  selected: boolean
}) {
  const dark = mode === 'dark'

  return (
    <div
      className={cn(
        'relative h-[148px] w-[78px] overflow-hidden rounded-[14px] border-[2.5px] p-[3px]',
        selected ? 'border-ios-primary' : 'border-transparent',
      )}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-[11px]',
          dark ? 'bg-[#1c1c1e]' : 'bg-[#f2f2f7]',
        )}
      >
        {/* Mini wallpaper / lock status */}
        <div
          className={cn(
            'relative flex flex-1 flex-col items-center px-1.5 pt-3',
            dark
              ? 'bg-[linear-gradient(160deg,#1a3a4a_0%,#0d2833_55%,#152028_100%)]'
              : 'bg-[linear-gradient(160deg,#7ec8e3_0%,#a8d8ea_45%,#c5e4f0_100%)]',
          )}
        >
          <div
            className={cn(
              'text-[11px] font-semibold tracking-tight',
              dark ? 'text-white/90' : 'text-black/75',
            )}
          >
            9:41
          </div>
          <div
            className={cn(
              'mt-3 h-5 w-5 rounded-full',
              dark ? 'bg-white/25' : 'bg-white/55',
            )}
          />
          <div className="mt-auto w-full space-y-1 pb-2">
            <div
              className={cn(
                'h-[14px] w-full rounded-[5px]',
                dark ? 'bg-white/18' : 'bg-white/70',
              )}
            />
            <div
              className={cn(
                'h-[14px] w-[78%] rounded-[5px]',
                dark ? 'bg-white/14' : 'bg-white/55',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
