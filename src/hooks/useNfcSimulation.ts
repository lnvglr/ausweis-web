import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { NfcSheetState } from '@/components/ios/NfcScanSheet'

type Options = {
  open: boolean
  onSuccess?: () => void
  /**
   * When true (default), sheet stays on ready until
   * placeCard / fail* is called from demo controls.
   */
  manual?: boolean
}

export function useNfcSimulation({
  open,
  onSuccess,
  manual = true,
}: Options) {
  const [state, setState] = useState<NfcSheetState>('ready')
  const timers = useRef<number[]>([])
  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])

  const finishSuccess = useCallback(() => {
    setState('success')
    onSuccessRef.current?.()
  }, [])

  const placeCard = useCallback(() => {
    clearTimers()
    setState('reading')
    const id = window.setTimeout(() => {
      finishSuccess()
    }, 1400 + Math.random() * 600)
    timers.current.push(id)
  }, [clearTimers, finishSuccess])

  const failMoved = useCallback(() => {
    clearTimers()
    setState('error-moved')
  }, [clearTimers])

  const failTimeout = useCallback(() => {
    clearTimers()
    setState('error-timeout')
  }, [clearTimers])

  const failGeneric = useCallback(() => {
    clearTimers()
    setState('error-generic')
  }, [clearTimers])

  const cancel = useCallback(() => {
    clearTimers()
    setState('ready')
  }, [clearTimers])

  const retry = useCallback(() => {
    clearTimers()
    setState('ready')
  }, [clearTimers])

  const startAuto = useCallback(() => {
    clearTimers()
    setState('ready')
    const readingId = window.setTimeout(() => {
      setState('reading')
      const outcomeId = window.setTimeout(() => {
        finishSuccess()
      }, 1600)
      timers.current.push(outcomeId)
    }, 900)
    timers.current.push(readingId)
  }, [clearTimers, finishSuccess])

  useEffect(() => {
    if (!open) {
      clearTimers()
      setState('ready')
      return clearTimers
    }
    if (manual) {
      clearTimers()
      setState('ready')
      return clearTimers
    }
    startAuto()
    return clearTimers
  }, [open, manual, clearTimers, startAuto])

  return useMemo(
    () => ({
      state,
      setState,
      placeCard,
      failMoved,
      failTimeout,
      failGeneric,
      cancel,
      retry,
    }),
    [
      state,
      placeCard,
      failMoved,
      failTimeout,
      failGeneric,
      cancel,
      retry,
    ],
  )
}
