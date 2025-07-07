import { createContext } from 'react'
import { GetAuthenticatedUserResult } from 'types/endpoints'

type AuthenticationContextValue = {
  setAuthenticatedUser: (user: GetAuthenticatedUserResult) => void
  authenticatedUser?: GetAuthenticatedUserResult
  error?: unknown
  loading?: boolean
}

export const AuthenticationContext = createContext<AuthenticationContextValue>({
  setAuthenticatedUser: () => {}
})
