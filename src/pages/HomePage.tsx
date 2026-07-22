import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { NavBar } from '@/components/ios/NavBar'
import { SFChevronRight, SFIphone } from '@/components/ios/SF'
import { usePairings } from '@/context/PairingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { iosSpring } from '@/lib/iosMotion'
import { routes } from '@/lib/routes'

export function HomePage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { devices, primaryDevice, readerReady } = usePairings()
  const hasPairing = devices.length > 0

  const companionDesc = !hasPairing
    ? t('homeCompanionDescPair')
    : readerReady
      ? t('homeCompanionDescReady', { device: primaryDevice?.name ?? 'Mac' })
      : t('homeCompanionDescOff', { device: primaryDevice?.name ?? 'Mac' })

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar largeTitle={t('tabScan')} subtitle={t('homeSubtitle')} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-32 pt-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          transition={iosSpring.press}
          onClick={() => navigate(routes.identify)}
          className="w-full overflow-hidden rounded-[var(--radius-ios-grouped)] bg-[#0b1f3a] p-5 text-left text-white shadow-[0_12px_40px_rgba(11,31,58,0.28)]"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-ios-green/80" />
              <span className="relative h-2 w-2 rounded-full bg-ios-green" />
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-white/70">
              {t('homePendingLabel')}
            </span>
          </div>
          <h2 className="headline mt-3 text-[26px] font-bold leading-tight">
            {t('homeIdentify')}
          </h2>
          <p className="mt-1.5 text-[15px] leading-[20px] text-white/75">
            {t('homeIdentifyDesc')}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] text-white/55">{t('identifyProvider')}</p>
              <p className="text-[15px] font-semibold">{t('identifyProviderName')}</p>
            </div>
            <span className="inline-flex h-11 items-center rounded-full bg-ios-primary px-5 text-[15px] font-medium text-white">
              {t('homeIdentifyCta')}
            </span>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          transition={iosSpring.press}
          onClick={() =>
            navigate(routes.companion, {
              state: {
                mode: hasPairing ? 'use' : 'pair',
              },
            })
          }
          className="mt-5 flex w-full items-center gap-4 rounded-[var(--radius-ios-grouped)] border border-ios-separator bg-ios-card p-4 text-left active:bg-ios-fill/40"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-ios-xl)] bg-[#5856D6]/12 text-[#5856D6]">
            <SFIphone size={24} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="block text-[17px] font-semibold tracking-[-0.02em] text-ios-label">
                {hasPairing ? t('homeCompanion') : t('homeCompanionPair')}
              </span>
              {hasPairing && readerReady ? (
                <span className="h-1.5 w-1.5 rounded-full bg-ios-green" />
              ) : null}
            </span>
            <span className="mt-0.5 block text-[13px] leading-[18px] text-ios-secondary-label">
              {companionDesc}
            </span>
          </span>
          <SFChevronRight size={14} className="shrink-0 text-ios-gray3" aria-hidden />
        </motion.button>

        <div className="mt-10 flex items-center justify-center gap-4 text-[13px] text-ios-tertiary-label">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ios-green" />
            {t('homeStatusNfc')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ios-green" />
            {t('homeStatusEid')}
          </span>
        </div>
      </div>
    </div>
  )
}
