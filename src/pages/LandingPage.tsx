import { useEffect, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  SFAlignHorizontalCenter,
  SFBolt,
  SFCheckmarkShieldFill,
  SFEye,
  SFGearshapeFill,
  SFGlobe,
  SFIphone,
  SFIphoneRadiowavesLeftAndRight,
  SFLockFill,
  SFPersonBadgeKeyFill,
  SFViewfinder,
  SFWave3RightCircleFill,
} from '@/components/ios/SF'
import { useSettings } from '@/context/SettingsContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useI18n } from '@/i18n/I18nContext'
import { routes } from '@/lib/routes'
import {
  landingCopy,
  resolveLandingLang,
  type LandingLang,
} from '@/pages/landingCopy'

const asset = (file: string) =>
  `${import.meta.env.BASE_URL}screenshots/${file}`

const fades = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

type Icon = ComponentType<{
  size?: number
  className?: string
  'aria-hidden'?: boolean
}>

const CRITERIA_ICONS: Icon[] = [
  SFIphone,
  SFAlignHorizontalCenter,
  SFBolt,
  SFEye,
  SFViewfinder,
  SFCheckmarkShieldFill,
]

const SCOPE_ICONS: Icon[] = [
  SFPersonBadgeKeyFill,
  SFIphoneRadiowavesLeftAndRight,
  SFLockFill,
  SFWave3RightCircleFill,
  SFGearshapeFill,
  SFGlobe,
]

const APPEARANCE_CYCLE = ['system', 'light', 'dark'] as const

export function LandingPage() {
  const reduceMotion = useReducedMotion()
  const scheme = useColorScheme()
  const { appearance, setAppearance } = useSettings()
  const { contentLocale, setLocale } = useI18n()
  const lang = resolveLandingLang(contentLocale)
  const copy = landingCopy[lang]

  useEffect(() => {
    document.title = copy.documentTitle
    document.documentElement.lang = lang
  }, [copy.documentTitle, lang])

  const toggleAppearance = () => {
    const i = APPEARANCE_CYCLE.indexOf(appearance)
    setAppearance(APPEARANCE_CYCLE[(i + 1) % APPEARANCE_CYCLE.length])
  }

  const toggleLandingLang = () => {
    const next: LandingLang = lang === 'de' ? 'en' : 'de'
    setLocale(next)
  }

  const appearanceLabel = {
    system: copy.appearance.system,
    light: copy.appearance.light,
    dark: copy.appearance.dark,
  }[appearance]

  const appearanceNextLabel = {
    system: copy.appearance.nextSystem,
    light: copy.appearance.nextLight,
    dark: copy.appearance.nextDark,
  }[appearance]

  return (
    <div
      className="landing fixed inset-0 overflow-x-hidden overflow-y-auto"
      data-theme={scheme}
      lang={lang}
    >
      <div className="landing-glow" aria-hidden />
      <div className="landing-grid" aria-hidden />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-landing-display)] text-[17px] font-semibold tracking-[-0.03em]"
        >
          AusweisApp
        </a>
        <nav className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={toggleLandingLang}
            aria-label={copy.langToggleLabel}
            title={copy.langToggleLabel}
            className="flex h-9 min-w-9 items-center justify-center rounded-full border border-[color:var(--landing-toggle-border)] bg-[var(--landing-toggle-bg)] px-2.5 text-[12px] font-semibold tracking-[-0.01em] text-[color:var(--landing-fg)] transition hover:bg-[var(--landing-toggle-hover)] active:scale-[0.96]"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <button
            type="button"
            onClick={toggleAppearance}
            aria-label={appearanceNextLabel}
            title={appearanceLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--landing-toggle-border)] bg-[var(--landing-toggle-bg)] text-[color:var(--landing-fg)] transition hover:bg-[var(--landing-toggle-hover)] active:scale-[0.96]"
          >
            {appearance === 'system' ? (
              <SystemIcon />
            ) : appearance === 'light' ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
          <a
            href="https://leonvogler.com"
            className="text-[13px] font-medium text-[color:var(--landing-nav)] transition hover:text-[color:var(--landing-nav-hover)]"
            rel="noreferrer"
            target="_blank"
          >
            leonvogler.com
          </a>
          <a
            href="https://github.com/lnvglr/ausweis-web"
            className="hidden text-[13px] font-medium text-[color:var(--landing-nav)] transition hover:text-[color:var(--landing-nav-hover)] sm:inline"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-6xl items-end gap-10 px-5 pb-10 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-16 lg:pt-4">
          <motion.div
            className="relative z-10 max-w-xl pb-2 lg:pb-8"
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            transition={{ staggerChildren: reduceMotion ? 0 : 0.09 }}
          >
            <motion.p
              variants={fades}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--landing-accent)]"
            >
              {copy.eyebrow}
            </motion.p>
            <motion.h1
              variants={fades}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-[family-name:var(--font-landing-display)] text-[clamp(3.25rem,9vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
            >
              AusweisApp
            </motion.h1>
            <motion.p
              variants={fades}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-md text-[clamp(1.1rem,2.2vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-[color:var(--landing-soft)]"
            >
              {copy.hero}
            </motion.p>
            <motion.div
              variants={fades}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to={routes.home}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#007aff] px-7 text-[15px] font-semibold text-white transition hover:bg-[#0066d6] active:scale-[0.98]"
              >
                {copy.openPrototype}
              </Link>
              <a
                href="https://github.com/lnvglr/ausweis-web"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--landing-btn-secondary-border)] bg-[var(--landing-btn-secondary-bg)] px-6 text-[15px] font-medium text-[color:var(--landing-btn-secondary-fg)] transition hover:border-[color:var(--landing-btn-secondary-hover-border)] hover:bg-[var(--landing-btn-secondary-hover-bg)]"
                rel="noreferrer"
                target="_blank"
              >
                {copy.source}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : 0.12,
            }}
          >
            <motion.div
              className="relative"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 7.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              <div className="landing-phone">
                <img
                  src={asset('/smartphone-screen-mockup-17.webp')}
                  alt={copy.phoneAlt}
                  className="block h-auto w-full"
                  width={1920}
                  height={1335}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              {copy.motivationTitle}
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[color:var(--landing-muted)] sm:text-[17px]">
              {copy.motivation.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              {copy.criteriaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              {copy.criteriaIntro}
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.criteria.map((item, index) => {
                const Icon = CRITERIA_ICONS[index]
                return (
                  <li
                    key={item.title}
                    className="border-t border-[color:var(--landing-border-strong)] pt-5"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--landing-chip-bg)] text-[color:var(--landing-chip-fg)]">
                      <Icon size={18} aria-hidden />
                    </span>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--landing-faint)]">
                      {item.body}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              {copy.practiceTitle}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              {copy.practiceIntro}
            </p>

            <ul className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
              {copy.highlights.map((item) => (
                <li key={item.file} className="flex flex-col">
                  <figure className="landing-highlight">
                    <img
                      src={asset(item.file)}
                      alt={item.alt}
                      width={1456}
                      height={2008}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </figure>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--landing-faint)]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              {copy.scopeTitle}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              {copy.scopeIntro}
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.scope.map((item, index) => {
                const Icon = SCOPE_ICONS[index]
                return (
                  <li
                    key={item.title}
                    className="border-t border-[color:var(--landing-border-strong)] pt-5"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--landing-chip-bg)] text-[color:var(--landing-chip-muted-fg)]">
                      <Icon size={18} aria-hidden />
                    </span>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--landing-faint)]">
                      {item.body}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.85rem,4.5vw,2.75rem)] font-semibold tracking-[-0.045em]">
              {copy.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              {copy.ctaBody}
            </p>
            <p className="mx-auto mt-3 text-[14px] text-[color:var(--landing-dim)]">
              {copy.demoPinLabel}{' '}
              <span className="text-[color:var(--landing-soft)]">123456</span>
              {' · '}
              {copy.transportPinLabel}{' '}
              <span className="text-[color:var(--landing-soft)]">12345</span>
            </p>
            <Link
              to={routes.home}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#007aff] px-8 text-[15px] font-semibold text-white transition hover:bg-[#0066d6] active:scale-[0.98]"
            >
              {copy.openPrototype}
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[color:var(--landing-border)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[13px] leading-relaxed text-[color:var(--landing-dim)] sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl">
            {copy.footerBefore}
            <a
              href="https://leonvogler.com"
              className="text-[color:var(--landing-link)] underline decoration-[color:var(--landing-link-underline)] underline-offset-2 transition hover:text-[color:var(--landing-link-hover)]"
              rel="noreferrer"
              target="_blank"
            >
              Leon Vogler
            </a>
            {copy.footerAfter}
          </p>
          <p className="shrink-0">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1.5v1.75M8 12.75V14.5M1.5 8h1.75M12.75 8H14.5M3.4 3.4l1.24 1.24M11.36 11.36l1.24 1.24M12.6 3.4l-1.24 1.24M4.64 11.36l-1.24 1.24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 9.35A5.75 5.75 0 0 1 6.65 2.5 5.75 5.75 0 1 0 13.5 9.35Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Half-filled circle — matches “Automatic / system” appearance. */
function SystemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2.75a5.25 5.25 0 0 1 0 10.5V2.75Z" fill="currentColor" />
    </svg>
  )
}
