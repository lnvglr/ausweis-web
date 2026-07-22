import { useCallback, useEffect, useRef, useState } from 'react'
import type { NfcSheetState } from '@/components/ios/NfcScanSheet'

type Options = {
  /** Chance (0-1) that the card is "moved away" during reading */
  moveAwayChance?: number
  open: boolean
  onSuccess?: () => void
}

export function useNfcSimulation({
  open,
  onSuccess,
  moveAwayChance = 0.12,
}: Options) {
  const [state, setState] = useState<NfcSheetState>('ready')
  const timers = useRef<number[]>([])
  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])

  const start = useCallback(() => {
    clearTimers()
    setState('ready')

    const readingId = window.setTimeout(() => {
      setState('reading')

      const outcomeId = window.setTimeout(() => {
        const roll = Math.random()
        if (roll < moveAwayChance) {
          setState('error-moved')
          return
        }
        if (roll < moveAwayChance + 0.06) {
          setState('error-timeout')
          return
        }
        setState('success')
        onSuccessRef.current?.()
      }, 1600 + Math.random() * 900)

      timers.current.push(outcomeId)
    }, 900)

    timers.current.push(readingId)
  }, [clearTimers, moveAwayChance])

  const cancel = useCallback(() => {
    clearTimers()
    setState('ready')
  }, [clearTimers])

  const retry = useCallback(() => {
    start()
  }, [start])

  const failGeneric = useCallback(() => {
    clearTimers()
    setState('error-generic')
  }, [clearTimers])

  useEffect(() => {
    if (open) start()
    else {
      clearTimers()
      setState('ready')
    }
    return clearTimers
  }, [open, start, clearTimers])

  return { state, setState, cancel, retry, failGeneric }
}
