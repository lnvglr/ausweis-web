import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { routes } from '@/lib/routes'

const asset = (file: string) =>
  `${import.meta.env.BASE_URL}screenshots/${file}`

const fades = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function LandingPage() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = 'AusweisApp — redesign proposal'
    document.documentElement.lang = 'en'
  }, [])

  return (
    <div className="landing fixed inset-0 overflow-x-hidden overflow-y-auto bg-[#07090f] text-[#f4f6fa]">
      <div className="landing-glow" aria-hidden />
      <div className="landing-grid" aria-hidden />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-landing-display)] text-[17px] font-semibold tracking-[-0.03em]"
        >
          AusweisApp
        </a>
        <nav className="flex items-center gap-5">
          <a
            href="https://leonvogler.com"
            className="text-[13px] font-medium text-white/55 transition hover:text-white"
            rel="noreferrer"
            target="_blank"
          >
            leonvogler.com
          </a>
          <a
            href="https://github.com/lnvglr/ausweis-web"
            className="text-[13px] font-medium text-white/55 transition hover:text-white"
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
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6eb6ff]"
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
              className="mt-5 max-w-md text-[clamp(1.1rem,2.2vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-white/85"
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
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-[15px] font-medium text-white/85 transition hover:border-white/25 hover:bg-white/[0.07]"
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
            <div className="landing-phone-glow" aria-hidden />
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
                  src={asset('01-home-scan.png')}
                  alt="Redesigned AusweisApp Scan screen in an iPhone frame"
                  className="block h-auto w-full"
                  width={1456}
                  height={2008}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              Motivation
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
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

        <section className="relative border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              Design criteria
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/50">
              Assumptions this prototype is built against.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Platform literacy',
                  body: 'Navigation, sheets, lists, and controls follow iOS patterns so the app reads as native rather than a generic web form.',
                },
                {
                  title: 'Layout discipline',
                  body: 'Type, spacing, and alignment are treated as constraints. Screens stay quiet so the current step remains obvious.',
                },
                {
                  title: 'Responsive interaction',
                  body: 'Transitions are short; taps resolve quickly. Latency in the UI should not add to the cognitive load of authentication.',
                },
                {
                  title: 'Clarity under load',
                  body: 'Consent, PIN entry, and NFC prompts stay scannable. Copy and structure aim for low ambiguity.',
                },
                {
                  title: 'Narrow scope per screen',
                  body: 'Identify, pairing, PIN change, and device check each get a focused path without secondary noise.',
                },
                {
                  title: 'Presentation as signal',
                  body: 'For authenticators, an unfinished-looking UI is a trust problem. The prototype treats finish quality as part of the UX.',
                },
              ].map((item) => (
                <li key={item.title} className="border-t border-white/10 pt-5">
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/48">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              Scope
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/50">
              Same functional jobs as the official app; different presentation.
              No real eID, NFC hardware, or personal data.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Identify online',
                  body: 'Provider consent, NFC sheet, card PIN, success.',
                },
                {
                  title: 'Phone as card reader',
                  body: 'Mac pairing code and standby for remote scan requests.',
                },
                {
                  title: 'Change PIN',
                  body: 'Select 6-digit, Transport-PIN, or no PIN, then enter.',
                },
                {
                  title: 'Device & ID check',
                  body: 'Simulated NFC check that the phone can reach the card.',
                },
                {
                  title: 'Settings & help',
                  body: 'Language, appearance, pairings, and help pages.',
                },
                {
                  title: 'Localization',
                  body: 'German and English across the prototype.',
                },
              ].map((item) => (
                <li key={item.title} className="border-t border-white/10 pt-5">
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/48">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.04em]">
              Screens
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/50">
              Representative states from the prototype: consent, NFC, pairing,
              PIN, and settings.
            </p>
          </div>

          <div className="landing-marquee mt-14">
            <div className="landing-marquee-track">
              {[
                '02-identify-consent.png',
                '08-nfc-scan.png',
                '07-pair-mac.png',
                '04-settings.png',
                '05-change-pin.png',
                '09-nfc-success.png',
                '02-identify-consent.png',
                '08-nfc-scan.png',
                '07-pair-mac.png',
                '04-settings.png',
                '05-change-pin.png',
                '09-nfc-success.png',
              ].map((file, i) => (
                <figure key={`${file}-${i}`} className="landing-shot">
                  <img
                    src={asset(file)}
                    alt=""
                    width={1456}
                    height={2008}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-landing-display)] text-[clamp(1.85rem,4.5vw,2.75rem)] font-semibold tracking-[-0.045em]">
              Try the prototype
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-white/50">
              The interactive build is more useful than screenshots for
              evaluating motion, density, and flow.
            </p>
            <p className="mx-auto mt-3 text-[14px] text-white/40">
              Demo card PIN <span className="text-white/70">123456</span>
              {' · '}
              Transport-PIN <span className="text-white/70">12345</span>
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

      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[13px] leading-relaxed text-white/40 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl">
            Unofficial design exploration by{' '}
            <a
              href="https://leonvogler.com"
              className="text-white/65 underline decoration-white/20 underline-offset-2 transition hover:text-white"
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
