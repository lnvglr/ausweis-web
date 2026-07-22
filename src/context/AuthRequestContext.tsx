import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AUTH_REQUESTS,
  type AuthRequestDefinition,
  type AuthRequestKind,
} from '@/lib/authRequests'

export type PendingAuthRequest = {
  id: string
  kind: AuthRequestKind
}

type AuthRequestContextValue = {
  pendingRequest: PendingAuthRequest | null
  pendingDefinition: AuthRequestDefinition | null
  receiveAuthRequest: (kind: AuthRequestKind) => void
  clearAuthRequest: () => void
}

const AuthRequestContext = createContext<AuthRequestContextValue | null>(null)

export function AuthRequestProvider({ children }: { children: ReactNode }) {
  const [pendingRequest, setPendingRequest] =
    useState<PendingAuthRequest | null>(null)

  const receiveAuthRequest = useCallback((kind: AuthRequestKind) => {
    setPendingRequest({
      id: `auth-${kind}-${Date.now()}`,
      kind,
    })
  }, [])

  const clearAuthRequest = useCallback(() => {
    setPendingRequest(null)
  }, [])

  const pendingDefinition = pendingRequest
    ? AUTH_REQUESTS[pendingRequest.kind]
    : null

  const value = useMemo(
    () => ({
      pendingRequest,
      pendingDefinition,
      receiveAuthRequest,
      clearAuthRequest,
    }),
    [pendingRequest, pendingDefinition, receiveAuthRequest, clearAuthRequest],
  )

  return (
    <AuthRequestContext.Provider value={value}>
      {children}
    </AuthRequestContext.Provider>
  )
}

export function useAuthRequest() {
  const ctx = useContext(AuthRequestContext)
  if (!ctx) {
    throw new Error('useAuthRequest must be used within AuthRequestProvider')
  }
  return ctx
}
