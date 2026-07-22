import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { DemoAction } from '@/context/DemoDirectorContext'
import { useDemoActions } from '@/context/DemoDirectorContext'
import type { NfcSheetState } from '@/components/ios/NfcScanSheet'
import { demoRelativePath } from '@/lib/routes'

type NfcControls = {
  placeCard: () => void
  failMoved: () => void
  failTimeout: () => void
  failGeneric: () => void
  retry: () => void
}

/** Registers floating NFC outcome controls while a scan sheet is open. */
export function useNfcDemoActions(
  open: boolean,
  state: NfcSheetState,
  nfc: NfcControls,
) {
  const location = useLocation()
  const path = demoRelativePath(location.pathname)
  // AnimatePresence may keep the page mounted during exit — only stay
  // active on routes that actually host an NFC sheet.
  const nfcRouteActive =
    path === '/identify' ||
    path === '/personal-data' ||
    path === '/settings/device-check'

  const actions = useMemo((): DemoAction[] => {
    if (!open) return []

    if (state === 'ready') {
      return [
        {
          id: 'nfc-place',
          label: 'Place card behind phone',
          detail: 'Start NFC reading',
          run: nfc.placeCard,
        },
        {
          id: 'nfc-moved',
          label: 'Card moved away',
          detail: 'Simulate read error',
          tone: 'danger',
          run: nfc.failMoved,
        },
        {
          id: 'nfc-timeout',
          label: 'Scan timeout',
          detail: 'No card detected',
          tone: 'danger',
          run: nfc.failTimeout,
        },
      ]
    }

    if (state === 'reading') {
      return [
        {
          id: 'nfc-moved',
          label: 'Card moved away',
          tone: 'danger',
          run: nfc.failMoved,
        },
        {
          id: 'nfc-timeout',
          label: 'Scan timeout',
          tone: 'danger',
          run: nfc.failTimeout,
        },
        {
          id: 'nfc-generic',
          label: 'Generic scan error',
          tone: 'danger',
          run: nfc.failGeneric,
        },
      ]
    }

    return []
  }, [open, state, nfc.placeCard, nfc.failMoved, nfc.failTimeout, nfc.failGeneric])

  useDemoActions(actions, nfcRouteActive && open)
}
