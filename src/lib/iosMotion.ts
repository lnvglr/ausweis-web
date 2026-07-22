import type { Transition, Variants } from 'motion/react'

/** UINavigationController-like tween (more “iOS” than floaty springs). */
export const iosTween = {
  push: {
    type: 'tween',
    ease: [0.32, 0.72, 0, 1],
    duration: 0.35,
  } satisfies Transition,
  step: {
    type: 'tween',
    ease: [0.32, 0.72, 0, 1],
    duration: 0.28,
  } satisfies Transition,
  tab: {
    type: 'tween',
    ease: 'linear',
    duration: 0.15,
  } satisfies Transition,
  sheet: {
    type: 'tween',
    ease: [0.32, 0.72, 0, 1],
    duration: 0.42,
  } satisfies Transition,
  soft: {
    type: 'tween',
    ease: [0.32, 0.72, 0, 1],
    duration: 0.28,
  } satisfies Transition,
  snappy: {
    type: 'spring',
    stiffness: 520,
    damping: 32,
    mass: 0.8,
  } satisfies Transition,
  press: {
    type: 'spring',
    stiffness: 600,
    damping: 35,
    mass: 0.6,
  } satisfies Transition,
} as const

/** @deprecated use iosTween — kept for existing imports */
export const iosSpring = {
  sheet: iosTween.sheet,
  push: iosTween.push,
  step: iosTween.step,
  snappy: iosTween.snappy,
  soft: iosTween.soft,
  press: iosTween.press,
} as const

export const iosEase = [0.32, 0.72, 0, 1] as const

export const reduced: Transition = {
  type: 'tween',
  duration: 0.01,
  ease: 'linear',
}

export function withReducedMotion(
  prefersReduced: boolean,
  transition: Transition,
): Transition {
  return prefersReduced ? reduced : transition
}

export const sheetVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0 },
  exit: { y: '110%' },
}

export const dimVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

/** Parent shell so AnimatePresence waits for nested sheet/dim exits. */
export const overlayShellVariants: Variants = {
  hidden: {},
  visible: {},
  exit: {
    transition: { when: 'afterChildren' },
  },
}

/** Classic UINavigation push/pop — transform only, slight parallax. */
export const pushVariants: Variants = {
  initial: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-28%',
    zIndex: dir >= 0 ? 3 : 1,
  }),
  animate: {
    x: 0,
    zIndex: 2,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-28%' : '100%',
    zIndex: dir >= 0 ? 1 : 3,
  }),
}

/** Tab switches are a quick crossfade — no slide. */
export const tabVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const stepVariants: Variants = {
  initial: (dir: number) => ({
    x: dir >= 0 ? 24 : -24,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir >= 0 ? -18 : 18,
    opacity: 0,
  }),
}

export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
}
