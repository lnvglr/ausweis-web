import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type PairedDevice = {
  id: string
  name: string
  platform: string
}

type PairingsContextValue = {
  devices: PairedDevice[]
  addDevice: (device: Omit<PairedDevice, 'id'> & { id?: string }) => PairedDevice
  removeDevice: (id: string) => void
  /** Phone is available as NFC card reader for paired Macs. On by default. */
  readerReady: boolean
  setReaderReady: (ready: boolean) => void
  primaryDevice: PairedDevice | null
}

const PairingsContext = createContext<PairingsContextValue | null>(null)

const SEED: PairedDevice[] = [
  { id: 'seed-macbook', name: 'MacBook Pro', platform: 'macOS' },
]

export function PairingsProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<PairedDevice[]>(SEED)
  const [readerReady, setReaderReady] = useState(true)

  const addDevice = useCallback(
    (device: Omit<PairedDevice, 'id'> & { id?: string }) => {
      const next: PairedDevice = {
        id: device.id ?? `mac-${Date.now()}`,
        name: device.name,
        platform: device.platform,
      }
      setDevices((prev) => {
        if (prev.some((d) => d.id === next.id)) return prev
        return [...prev, next]
      })
      setReaderReady(true)
      return next
    },
    [],
  )

  const removeDevice = useCallback((id: string) => {
    setDevices((prev) => {
      const next = prev.filter((d) => d.id !== id)
      if (next.length === 0) setReaderReady(false)
      return next
    })
  }, [])

  const primaryDevice = devices[0] ?? null

  const value = useMemo(
    () => ({
      devices,
      addDevice,
      removeDevice,
      readerReady,
      setReaderReady,
      primaryDevice,
    }),
    [devices, addDevice, removeDevice, readerReady, primaryDevice],
  )

  return (
    <PairingsContext.Provider value={value}>{children}</PairingsContext.Provider>
  )
}

export function usePairings() {
  const ctx = useContext(PairingsContext)
  if (!ctx) throw new Error('usePairings must be used within PairingsProvider')
  return ctx
}
