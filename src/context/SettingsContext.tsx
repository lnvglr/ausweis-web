import {
  createContext,
  useCallback,
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
  /** Bump to remount demo UI after a full reset. */
  resetToken: number
  /** Restore settings defaults and bump resetToken. */
  resetSettings: () => void
}

const SettingsContext = createContext<Settings | null>(null)

const DEFAULTS = {
  cardPin: '123456',
  haptics: true,
  useSystemFont: true,
  appearance: 'system' as Appearance,
  readingMode: 'nfc' as ReadingMode,
  imagesInsteadOfAnimations: false,
  hidePinKeyAnimations: true,
  manualProviderRedirect: false,
  pinOnThisDevice: true,
  showAuthOnThisDevice: false,
  randomizeKeys: false,
  hideKeyAnimations: true,
  detectScreenRecording: true,
  deviceName: 'iPhone',
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [cardPin, setCardPin] = useState(DEFAULTS.cardPin)
  const [haptics, setHaptics] = useState(DEFAULTS.haptics)
  const [useSystemFont, setUseSystemFont] = useState(DEFAULTS.useSystemFont)
  const [appearance, setAppearance] = useState<Appearance>(DEFAULTS.appearance)
  const [readingMode, setReadingMode] = useState<ReadingMode>(
    DEFAULTS.readingMode,
  )
  const [imagesInsteadOfAnimations, setImagesInsteadOfAnimations] = useState(
    DEFAULTS.imagesInsteadOfAnimations,
  )
  const [hidePinKeyAnimations, setHidePinKeyAnimations] = useState(
    DEFAULTS.hidePinKeyAnimations,
  )
  const [manualProviderRedirect, setManualProviderRedirect] = useState(
    DEFAULTS.manualProviderRedirect,
  )
  const [pinOnThisDevice, setPinOnThisDevice] = useState(
    DEFAULTS.pinOnThisDevice,
  )
  const [showAuthOnThisDevice, setShowAuthOnThisDevice] = useState(
    DEFAULTS.showAuthOnThisDevice,
  )
  const [randomizeKeys, setRandomizeKeys] = useState(DEFAULTS.randomizeKeys)
  const [hideKeyAnimations, setHideKeyAnimations] = useState(
    DEFAULTS.hideKeyAnimations,
  )
  const [detectScreenRecording, setDetectScreenRecording] = useState(
    DEFAULTS.detectScreenRecording,
  )
  const [deviceName, setDeviceName] = useState(DEFAULTS.deviceName)
  const [resetToken, setResetToken] = useState(0)

  const resetSettings = useCallback(() => {
    setCardPin(DEFAULTS.cardPin)
    setHaptics(DEFAULTS.haptics)
    setUseSystemFont(DEFAULTS.useSystemFont)
    setAppearance(DEFAULTS.appearance)
    setReadingMode(DEFAULTS.readingMode)
    setImagesInsteadOfAnimations(DEFAULTS.imagesInsteadOfAnimations)
    setHidePinKeyAnimations(DEFAULTS.hidePinKeyAnimations)
    setManualProviderRedirect(DEFAULTS.manualProviderRedirect)
    setPinOnThisDevice(DEFAULTS.pinOnThisDevice)
    setShowAuthOnThisDevice(DEFAULTS.showAuthOnThisDevice)
    setRandomizeKeys(DEFAULTS.randomizeKeys)
    setHideKeyAnimations(DEFAULTS.hideKeyAnimations)
    setDetectScreenRecording(DEFAULTS.detectScreenRecording)
    setDeviceName(DEFAULTS.deviceName)
    setResetToken((n) => n + 1)
  }, [])

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
      resetSettings,
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
      resetSettings,
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
