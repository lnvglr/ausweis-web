import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type DemoAction = {
  id: string
  label: string
  /** Optional short context under the label */
  detail?: string
  /** Destructive / error-style accent */
  tone?: 'default' | 'danger'
  run: () => void
}

type DemoDirectorValue = {
  actions: DemoAction[]
  /**
   * Publish actions for this owner. Pass [] to release.
   * Clearing only affects the board if this owner still holds it
   * (so AnimatePresence exits cannot wipe a newer screen's actions).
   */
  publish: (owner: string, actions: DemoAction[]) => void
  /** Floating demo PIN hint — set while a PIN pad is on screen. */
  pinHint: string | null
  setPinHint: (hint: string | null) => void
}

type Board = {
  owner: string | null
  actions: DemoAction[]
}

const DemoDirectorContext = createContext<DemoDirectorValue | null>(null)

export function DemoDirectorProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<Board>({ owner: null, actions: [] })
  const [pinHint, setPinHint] = useState<string | null>(null)

  const publish = useCallback((owner: string, actions: DemoAction[]) => {
    setBoard((prev) => {
      if (actions.length === 0) {
        // Only the current owner may clear the board.
        if (prev.owner !== owner) return prev
        return { owner: null, actions: [] }
      }
      return { owner, actions }
    })
  }, [])

  const value = useMemo(
    () => ({ actions: board.actions, publish, pinHint, setPinHint }),
    [board.actions, publish, pinHint],
  )

  return (
    <DemoDirectorContext.Provider value={value}>
      {children}
    </DemoDirectorContext.Provider>
  )
}

export function useDemoDirector() {
  const ctx = useContext(DemoDirectorContext)
  if (!ctx) {
    throw new Error('useDemoDirector must be used within DemoDirectorProvider')
  }
  return ctx
}

/**
 * Register floating demo actions for the current screen.
 * Clears on unmount or when `enabled` is false — but only if this
 * registrant still owns the board (safe with AnimatePresence exits).
 *
 * Use `enabled` when the page stays mounted under a stack (tab roots)
 * or while a route exit animation is still playing.
 */
export function useDemoActions(actions: DemoAction[], enabled = true) {
  const { publish } = useDemoDirector()
  const owner = useId()

  useEffect(() => {
    if (!enabled) {
      publish(owner, [])
      return
    }
    publish(owner, actions)
    return () => publish(owner, [])
  }, [actions, enabled, owner, publish])
}

/** Show the floating demo PIN hint while a PIN entry UI is mounted. */
export function useDemoPinHint(hint: string | null) {
  const { setPinHint } = useDemoDirector()

  useEffect(() => {
    setPinHint(hint)
    return () => setPinHint(null)
  }, [hint, setPinHint])
}
