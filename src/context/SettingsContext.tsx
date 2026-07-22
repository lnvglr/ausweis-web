import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Appearance = 'system' | 'light' | 'dark'
type ReadingMode = 'nfc' | 'remote'

type Settings = {
  cardPin: string
  setCardPin: (v: string) => void
  haptics: boolean
  setHaptics: (v: boolean) => void
  useSystemFont: boolean
  setUseSystemFont: (v: boolean) => void
  appearance: Appearance
  setAppearance: (v: Appearance) => void
  readingMode: ReadingMode
  setReadingMode: (v: ReadingMode) => void
  imagesInsteadOfAnimations: boolean
  setImagesInsteadOfAnimations: (v: boolean) => void
  hidePinKeyAnimations: boolean
  setHidePinKeyAnimations: (v: boolean) => void
  manualProviderRedirect: boolean
  setManualProviderRedirect: (v: boolean) => void
  pinOnThisDevice: boolean
  setPinOnThisDevice: (v: boolean) => void
  showAuthOnThisDevice: boolean
  setShowAuthOnThisDevice: (v: boolean) => void
  randomizeKeys: boolean
  setRandomizeKeys: (v: boolean) => void
  hideKeyAnimations: boolean
  setHideKeyAnimations: (v: boolean) => void
  detectScreenRecording: boolean
  setDetectScreenRecording: (v: boolean) => void
  deviceName: string
  setDeviceName: (v: string) => void
  resetDemo: () => void
  resetToken: number
}

const SettingsContext = createContext<Settings | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [cardPin, setCardPin] = useState('123456')
  const [haptics, setHaptics] = useState(true)
  const [useSystemFont, setUseSystemFont] = useState(true)
  const [appearance, setAppearance] = useState<Appearance>('system')
  const [readingMode, setReadingMode] = useState<ReadingMode>('nfc')
  const [imagesInsteadOfAnimations, setImagesInsteadOfAnimations] =
    useState(false)
  const [hidePinKeyAnimations, setHidePinKeyAnimations] = useState(true)
  const [manualProviderRedirect, setManualProviderRedirect] = useState(false)
  const [pinOnThisDevice, setPinOnThisDevice] = useState(true)
  const [showAuthOnThisDevice, setShowAuthOnThisDevice] = useState(false)
  const [randomizeKeys, setRandomizeKeys] = useState(false)
  const [hideKeyAnimations, setHideKeyAnimations] = useState(true)
  const [detectScreenRecording, setDetectScreenRecording] = useState(true)
  const [deviceName, setDeviceName] = useState('iPhone')
  const [resetToken, setResetToken] = useState(0)

  const value = useMemo(
    () => ({
      cardPin,
      setCardPin,
      haptics,
      setHaptics,
      useSystemFont,
      setUseSystemFont,
      appearance,
      setAppearance,
      readingMode,
      setReadingMode,
      imagesInsteadOfAnimations,
      setImagesInsteadOfAnimations,
      hidePinKeyAnimations,
      setHidePinKeyAnimations,
      manualProviderRedirect,
      setManualProviderRedirect,
      pinOnThisDevice,
      setPinOnThisDevice,
      showAuthOnThisDevice,
      setShowAuthOnThisDevice,
      randomizeKeys,
      setRandomizeKeys,
      hideKeyAnimations,
      setHideKeyAnimations,
      detectScreenRecording,
      setDetectScreenRecording,
      deviceName,
      setDeviceName,
      resetToken,
      resetDemo: () => setResetToken((n) => n + 1),
    }),
    [
      cardPin,
      haptics,
      useSystemFont,
      appearance,
      readingMode,
      imagesInsteadOfAnimations,
      hidePinKeyAnimations,
      manualProviderRedirect,
      pinOnThisDevice,
      showAuthOnThisDevice,
      randomizeKeys,
      hideKeyAnimations,
      detectScreenRecording,
      deviceName,
      resetToken,
    ],
  )

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}

export type { Appearance, ReadingMode }
