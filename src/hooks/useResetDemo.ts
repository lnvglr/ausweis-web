import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthRequest } from '@/context/AuthRequestContext'
import { usePairings } from '@/context/PairingsContext'
import { useSettings } from '@/context/SettingsContext'
import { routes } from '@/lib/routes'

/** Restore the prototype to its initial demo state and return to Scan home. */
export function useResetDemo() {
  const navigate = useNavigate()
  const { clearAuthRequest } = useAuthRequest()
  const { resetPairings } = usePairings()
  const { resetSettings } = useSettings()

  return useCallback(() => {
    clearAuthRequest()
    resetPairings()
    resetSettings()
    navigate(routes.home, { replace: true })
  }, [clearAuthRequest, resetPairings, resetSettings, navigate])
}
