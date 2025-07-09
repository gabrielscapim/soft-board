import { createContext } from 'react'
import { GetCurrentUserRoleResult } from 'types/endpoints'

type AuthorizationContextValue = {
  currentUserRole?: GetCurrentUserRoleResult | null
  error?: unknown
  loading?: boolean
}

export const AuthorizationContext = createContext<AuthorizationContextValue>({})
