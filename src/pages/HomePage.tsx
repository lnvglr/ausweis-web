import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { NavBar } from '@/components/ios/NavBar'
import {
  SFChevronRight,
  SFIphone,
  SFPersonBadgeKeyFill,
  SFWave3RightCircleFill,
} from '@/components/ios/SF'
import { useAuthRequest } from '@/context/AuthRequestContext'
import type { DemoAction } from '@/context/DemoDirectorContext'
import { useDemoActions } from '@/context/DemoDirectorContext'
import { usePairings } from '@/context/PairingsContext'
import { useI18n } from '@/i18n/I18nContext'
import { iosSpring, iosTween } from '@/lib/iosMotion'
import { demoRelativePath, routes } from '@/lib/routes'

export function HomePage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const homeActive = demoRelativePath(location.pathname) === '/'
  const { devices, primaryDevice, readerReady } = usePairings()
  const { pendingRequest, pendingDefinition, receiveAuthRequest } =
    useAuthRequest()
  const hasPairing = devices.length > 0
  const hasPending = pendingRequest !== null

  const companionDesc = !hasPairing
    ? t('homeCompanionDescPair')
    : readerReady
      ? t('homeCompanionDescReady', { device: primaryDevice?.name ?? 'Mac' })
      : t('homeCompanionDescOff', { device: primaryDevice?.name ?? 'Mac' })

  // Only outside actors — app UI handles pairing, opening reader, dismiss/cancel.
  const demoActions = useMemo(
    (): DemoAction[] => [
      {
        id: 'auth-wine-phone',
        label: 'Website on iPhone',
        detail: 'Weinkeller checkout — name + 18+',
        run: () => receiveAuthRequest('weinkeller-mobile'),
      },
      {
        id: 'auth-elster-mac',
        label: 'Website on Mac',
        detail: 'ELSTER asks to sign in',
        run: () => receiveAuthRequest('elster-desktop'),
      },
    ],
    [receiveAuthRequest],
  )

  useDemoActions(demoActions, homeActive)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ios-grouped">
      <NavBar largeTitle={t('tabScan')} subtitle={t('homeSubtitle')} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-32 pt-2">
        <AnimatePresence mode="wait" initial={false}>
          {hasPending ? (
            <motion.button
              key="pending"
              type="button"
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={iosTween.soft}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(routes.identify)}
              className="flex h-[260px] w-full flex-col overflow-hidden rounded-[var(--radius-ios-grouped)] bg-[#0b1f3a] p-5 text-left text-white shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ios-green/80" />
                  <span className="relative h-2 w-2 rounded-full bg-ios-green" />
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-white/70">
                  {t('homePendingLabel')}
                </span>
                {pendingDefinition ? (
                  <span className="text-[12px] text-white/45">
                    · {t(pendingDefinition.sourceLabel)}
                  </span>
                ) : null}
              </div>
              <h2 className="headline mt-3 text-[26px] font-bold leading-[31px]">
                {pendingDefinition
                  ? t(pendingDefinition.homeTitle)
                  : t('homeIdentify')}
              </h2>
              <p className="mt-1.5 line-clamp-3 flex-1 text-[15px] leading-[20px] text-white/75">
                {pendingDefinition
                  ? t(pendingDefinition.homeDesc)
                  : t('homeIdentifyDesc')}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <div>
                  <p className="text-[12px] text-white/55">
                    {t('identifyProvider')}
                  </p>
                  <p className="text-[15px] font-semibold">
                    {pendingDefinition
                      ? t(pendingDefinition.providerName)
                      : t('identifyProviderName')}
                  </p>
                </div>
                <span className="inline-flex h-11 items-center rounded-full bg-ios-primary px-5 text-[15px] font-medium text-white">
                  {t('homeIdentifyCta')}
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={iosTween.soft}
              className="flex h-[260px] w-full flex-col items-center justify-center rounded-[var(--radius-ios-grouped)] bg-ios-card px-6 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ios-fill/50 text-ios-secondary-label">
                <SFWave3RightCircleFill size={28} aria-hidden />
              </span>
              <h2 className="headline mt-4 text-[20px] font-bold leading-[25px] tracking-[-0.02em] text-ios-label">
                {t('homeIdleTitle')}
              </h2>
              <p className="mt-2 max-w-[280px] text-[15px] leading-[20px] text-ios-secondary-label">
                {t('homeIdleBody')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
          <SFChevronRight
            size={14}
            className="shrink-0 text-ios-gray3"
            aria-hidden
          />
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          transition={iosSpring.press}
          onClick={() => navigate(routes.personalData)}
          className="mt-3 flex w-full items-center gap-4 rounded-[var(--radius-ios-grouped)] border border-ios-separator bg-ios-card p-4 text-left active:bg-ios-fill/40"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-ios-xl)] bg-ios-primary/12 text-ios-primary">
            <SFPersonBadgeKeyFill size={24} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[17px] font-semibold tracking-[-0.02em] text-ios-label">
              {t('homePersonalData')}
            </span>
            <span className="mt-0.5 block text-[13px] leading-[18px] text-ios-secondary-label">
              {t('homePersonalDataDesc')}
            </span>
          </span>
          <SFChevronRight
            size={14}
            className="shrink-0 text-ios-gray3"
            aria-hidden
          />
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
