import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  useLocation,
  useNavigationType,
  useOutlet,
} from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { iosTween, withReducedMotion } from '@/lib/iosMotion'
import { cn } from '@/lib/cn'
import { demoRelativePath } from '@/lib/routes'

const TAB_PATHS = new Set(['/', '/settings'])
const FLOW_PATHS = new Set(['/identify', '/companion', '/privacy'])

function stackDepth(pathname: string) {
  if (pathname === '/privacy' || pathname.startsWith('/settings/help/')) return 2
  if (FLOW_PATHS.has(pathname) || pathname.startsWith('/settings/')) return 1
  return 0
}

function isTabPath(pathname: string) {
  return TAB_PATHS.has(pathname)
}

type StackLayer = {
  key: string
  node: ReactNode
}

/**
 * UITabBarController + UINavigationController model:
 * - Tab roots stay mounted and slide with parallax under pushes
 * - Stack pages slide in from the right / out to the right
 * - Direction is kept in a ref so AnimatePresence exits use the right custom
 */
export function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  const navType = useNavigationType()
  const reduced = useReducedMotion() ?? false
  const path = demoRelativePath(location.pathname)

  const onTab = isTabPath(path)

  const visitedTabs = useRef(new Set<string>(['/']))
  if (onTab) visitedTabs.current.add(path)

  const pathRef = useRef(path)
  const depthRef = useRef(stackDepth(path))
  const outletRef = useRef(outlet)
  outletRef.current = outlet

  /** 1 = push (forward), -1 = pop (back). Survives exit frames. */
  const directionRef = useRef(1)
  /** Which tab sits under the stack while a flow is open. */
  const underlayRef = useRef<'/' | '/settings'>('/')
  /** Previous stack pathname — used to detect PUSH-as-back navigations. */
  const prevStackPathRef = useRef<string | null>(null)

  const [stack, setStack] = useState<StackLayer | null>(() =>
    onTab
      ? null
      : {
          key: path,
          node: outlet,
        },
  )

  useLayoutEffect(() => {
    const nextPath = demoRelativePath(location.pathname)
    if (nextPath === pathRef.current) return

    const prevPath = pathRef.current
    const prevDepth = depthRef.current
    const nextDepth = stackDepth(nextPath)
    const nextIsTab = isTabPath(nextPath)
    const prevIsTab = isTabPath(prevPath)

    pathRef.current = nextPath
    depthRef.current = nextDepth

    if (nextIsTab) {
      // Dismiss stack → slide current page off to the right.
      directionRef.current = -1
      prevStackPathRef.current = null
      setStack(null)
      return
    }

    if (prevIsTab) {
      underlayRef.current = prevPath as '/' | '/settings'
      prevStackPathRef.current = null
    }

    const returningToPrevStack =
      !prevIsTab && prevStackPathRef.current === nextPath

    if (!prevIsTab) {
      prevStackPathRef.current = prevPath
    }

    const popping =
      navType === 'POP' ||
      nextDepth < prevDepth ||
      returningToPrevStack

    directionRef.current = popping ? -1 : 1

    setStack({
      key: nextPath,
      node: outletRef.current,
    })
  }, [location.pathname, location.state, navType])

  const transition = withReducedMotion(reduced, iosTween.push)
  const dir = directionRef.current
  const stackOpen = Boolean(stack)
  const underlay = underlayRef.current

  const homeActive = path === '/' && !stackOpen
  const settingsActive = path === '/settings' && !stackOpen
  const homeUnder = stackOpen && underlay === '/'
  const settingsUnder = stackOpen && underlay === '/settings'

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-ios-grouped">
      {visitedTabs.current.has('/') ? (
        <motion.div
          className={cn(
            'absolute inset-0 flex flex-col bg-ios-grouped',
            homeActive || homeUnder ? 'z-[1]' : 'hidden',
          )}
          aria-hidden={!homeActive}
          initial={false}
          animate={{
            x: homeUnder ? '-28%' : '0%',
          }}
          transition={transition}
          style={{
            pointerEvents: homeActive ? 'auto' : 'none',
            willChange: 'transform',
          }}
        >
          <HomePage />
        </motion.div>
      ) : null}

      {visitedTabs.current.has('/settings') ? (
        <motion.div
          className={cn(
            'absolute inset-0 flex flex-col bg-ios-grouped',
            settingsActive || settingsUnder ? 'z-[1]' : 'hidden',
          )}
          aria-hidden={!settingsActive}
          initial={false}
          animate={{
            x: settingsUnder ? '-28%' : '0%',
          }}
          transition={transition}
          style={{
            pointerEvents: settingsActive ? 'auto' : 'none',
            willChange: 'transform',
          }}
        >
          <SettingsPage />
        </motion.div>
      ) : null}

      <AnimatePresence initial={false} custom={dir}>
        {stack ? (
          <motion.div
            key={stack.key}
            custom={dir}
            variants={{
              initial: (d: number) => ({
                x: d >= 0 ? '100%' : '-28%',
                boxShadow: d >= 0 ? '-8px 0 24px rgba(0,0,0,0.08)' : 'none',
              }),
              animate: {
                x: 0,
                boxShadow: '-4px 0 16px rgba(0,0,0,0.06)',
              },
              exit: (d: number) => ({
                x: d >= 0 ? '-28%' : '100%',
                boxShadow: 'none',
              }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="absolute inset-0 z-[2] flex flex-col bg-ios-grouped"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {stack.node}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
