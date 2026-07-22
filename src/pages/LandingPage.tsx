import { useEffect, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  SFAlignHorizontalCenter,
  SFCheckmarkShieldFill,
  SFEye,
  SFGearshapeFill,
  SFGlobe,
  SFHandTap,
  SFIphone,
  SFIphoneRadiowavesLeftAndRight,
  SFLockFill,
  SFPersonBadgeKeyFill,
  SFViewfinder,
  SFWave3RightCircleFill,
} from '@/components/ios/SF'
import { useSettings } from '@/context/SettingsContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { routes } from '@/lib/routes'

const asset = (file: string) =>
  `${import.meta.env.BASE_URL}screenshots/${file}`

const fades = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

type Icon = ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>

const CRITERIA: {
  title: string
  body: string
  Icon: Icon
}[] = [
  {
    title: 'Platform literacy',
    body: 'Navigation, sheets, lists, and controls follow iOS patterns so the app reads as native rather than a generic web form.',
    Icon: SFIphone,
  },
  {
    title: 'Layout discipline',
    body: 'Type, spacing, and alignment are treated as constraints. Screens stay quiet so the current step remains obvious.',
    Icon: SFAlignHorizontalCenter,
  },
  {
    title: 'Responsive interaction',
    body: 'Transitions are short; taps resolve quickly. Latency in the UI should not add to the cognitive load of authentication.',
    Icon: SFHandTap,
  },
  {
    title: 'Clarity under load',
    body: 'Consent, PIN entry, and NFC prompts stay scannable. Copy and structure aim for low ambiguity.',
    Icon: SFEye,
  },
  {
    title: 'Narrow scope per screen',
    body: 'Identify, pairing, PIN change, and device check each get a focused path without secondary noise.',
    Icon: SFViewfinder,
  },
  {
    title: 'Presentation as signal',
    body: 'For authenticators, an unfinished-looking UI is a trust problem. The prototype treats finish quality as part of the UX.',
    Icon: SFCheckmarkShieldFill,
  },
]

const SCOPE: {
  title: string
  body: string
  Icon: Icon
}[] = [
  {
    title: 'Identify online',
    body: 'Provider consent, NFC sheet, card PIN, success.',
    Icon: SFPersonBadgeKeyFill,
  },
  {
    title: 'Phone as card reader',
    body: 'Mac pairing code and standby for remote scan requests.',
    Icon: SFIphoneRadiowavesLeftAndRight,
  },
  {
    title: 'Change PIN',
    body: 'Select 6-digit, Transport-PIN, or no PIN, then enter.',
    Icon: SFLockFill,
  },
  {
    title: 'Device & ID check',
    body: 'Simulated NFC check that the phone can reach the card.',
    Icon: SFWave3RightCircleFill,
  },
  {
    title: 'Settings & help',
    body: 'Language, appearance, pairings, and help pages.',
    Icon: SFGearshapeFill,
  },
  {
    title: 'Localization',
    body: 'German and English across the prototype.',
    Icon: SFGlobe,
  },
]

/** A few states that carry the argument — not a gallery. */
const HIGHLIGHTS: {
  file: string
  title: string
  body: string
  alt: string
}[] = [
  {
    file: '02-identify-consent.png',
    title: 'Consent before the card',
    body: 'Provider context and requested data stay readable. Hierarchy does the work instead of decorative chrome.',
    alt: 'Identify consent screen listing requested personal data',
  },
  {
    file: '08-nfc-scan.png',
    title: 'NFC as a system sheet',
    body: 'Scanning uses a familiar bottom sheet and short feedback. Authentication should feel like platform UI, not a custom dialog.',
    alt: 'NFC scan sheet prompting to place the ID card',
  },
  {
    file: '07-pair-mac.png',
    title: 'Pairing without clutter',
    body: 'One job on screen: show a code, wait, continue. Ordinary flows still need finish quality if the product is asking for trust.',
    alt: 'Mac pairing screen showing a pairing code',
  },
]

const APPEARANCE_CYCLE = ['system', 'light', 'dark'] as const

const APPEARANCE_LABEL = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const

const APPEARANCE_NEXT_LABEL = {
  system: 'Switch to light appearance',
  light: 'Switch to dark appearance',
  dark: 'Switch to system appearance',
} as const

export function LandingPage() {
  const reduceMotion = useReducedMotion()
  const scheme = useColorScheme()
  const { appearance, setAppearance } = useSettings()

  useEffect(() => {
    document.title = 'AusweisApp — redesign proposal'
    document.documentElement.lang = 'en'
  }, [])

  const toggleAppearance = () => {
    const i = APPEARANCE_CYCLE.indexOf(appearance)
    setAppearance(APPEARANCE_CYCLE[(i + 1) % APPEARANCE_CYCLE.length])
  }

  return (
    <div
      className="landing fixed inset-0 overflow-x-hidden overflow-y-auto"
      data-theme={scheme}
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
        <nav className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={toggleAppearance}
            aria-label={APPEARANCE_NEXT_LABEL[appearance]}
            title={APPEARANCE_LABEL[appearance]}
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
            className="text-[13px] font-medium text-[color:var(--landing-nav)] transition hover:text-[color:var(--landing-nav-hover)]"
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
              Unofficial redesign proposal
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
              A flat, iOS-aligned web prototype of the German online ID flows —
              built because the current app’s interface does not meet the bar
              for something this sensitive.
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
                Open prototype
              </Link>
              <a
                href="https://github.com/lnvglr/ausweis-web"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--landing-btn-secondary-border)] bg-[var(--landing-btn-secondary-bg)] px-6 text-[15px] font-medium text-[color:var(--landing-btn-secondary-fg)] transition hover:border-[color:var(--landing-btn-secondary-hover-border)] hover:bg-[var(--landing-btn-secondary-hover-bg)]"
                rel="noreferrer"
                target="_blank"
              >
                Source
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
                  alt="Redesigned AusweisApp Scan screen in an iPhone frame"
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
              Motivation
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[color:var(--landing-muted)] sm:text-[17px]">
              <p>
                eID authentication is a high-trust interaction. The shipping
                AusweisApp UI and UX do not reflect that: the interface feels
                inconsistent and dated. It does not follow iOS Human Interface
                conventions in a disciplined way, and it also falls short of
                general design basics — clear hierarchy, consistent spacing,
                alignment, and immediate feedback.
              </p>
              <p>
                Software that asks for a PIN and an ID card should look and
                behave like solid system software: familiar patterns, restrained
                motion, and layouts that stay orderly. Visual polish is not
                decoration here; it is part of how credibility is communicated.
              </p>
              <p>
                This repository is an independent redesign proposal. It keeps
                the same core flows and reimplements them as a browser prototype
                so the interaction design can be inspected directly.
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              Design criteria
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              Assumptions this prototype is built against.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {CRITERIA.map(({ title, body, Icon }) => (
                <li
                  key={title}
                  className="border-t border-[color:var(--landing-border-strong)] pt-5"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--landing-chip-bg)] text-[color:var(--landing-chip-fg)]">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--landing-faint)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              In practice
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              Three moments from the prototype that show what the redesign is
              arguing for — calm hierarchy, platform-native chrome, and one job
              per screen.
            </p>

            <ul className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
              {HIGHLIGHTS.map((item) => (
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
              Scope
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              Same functional jobs as the official app; different presentation.
              No real eID, NFC hardware, or personal data.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {SCOPE.map(({ title, body, Icon }) => (
                <li
                  key={title}
                  className="border-t border-[color:var(--landing-border-strong)] pt-5"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--landing-chip-bg)] text-[color:var(--landing-chip-muted-fg)]">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--landing-faint)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-[color:var(--landing-border)] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.85rem,4.5vw,2.75rem)] font-semibold tracking-[-0.045em]">
              Try the prototype
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-[color:var(--landing-faint)]">
              The interactive build is more useful than screenshots for
              evaluating motion, density, and flow.
            </p>
            <p className="mx-auto mt-3 text-[14px] text-[color:var(--landing-dim)]">
              Demo card PIN{' '}
              <span className="text-[color:var(--landing-soft)]">123456</span>
              {' · '}
              Transport-PIN{' '}
              <span className="text-[color:var(--landing-soft)]">12345</span>
            </p>
            <Link
              to={routes.home}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#007aff] px-8 text-[15px] font-semibold text-white transition hover:bg-[#0066d6] active:scale-[0.98]"
            >
              Open prototype
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[color:var(--landing-border)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[13px] leading-relaxed text-[color:var(--landing-dim)] sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl">
            Unofficial design exploration by{' '}
            <a
              href="https://leonvogler.com"
              className="text-[color:var(--landing-link)] underline decoration-[color:var(--landing-link-underline)] underline-offset-2 transition hover:text-[color:var(--landing-link-hover)]"
              rel="noreferrer"
              target="_blank"
            >
              Leon Vogler
            </a>
            . Not affiliated with the official AusweisApp, Governikus, or the
            German government. No real eID, NFC, or personal data. MIT license.
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
