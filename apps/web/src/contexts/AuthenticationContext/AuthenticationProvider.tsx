import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { GetAuthenticatedUserResult } from 'types/endpoints'
import { AuthenticationContext } from './AuthenticationContext'

export type AuthenticationProviderProps = PropsWithChildren

export function AuthenticationProvider ({ children }: AuthenticationProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<GetAuthenticatedUserResult>(null)

  const client = useClient()
  const getAuthenticatedUser = useQuery({
    queryKey: ['getAuthenticatedUser'],
    queryFn: async () => client.getAuthenticatedUser(),
  })

  useEffect(() => {
    setAuthenticatedUser(getAuthenticatedUser.data ?? null)
  }, [getAuthenticatedUser.data])

  return (
    <AuthenticationContext.Provider
      value={{
        authenticatedUser: getAuthenticatedUser.data ?? authenticatedUser,
        setAuthenticatedUser: user => setAuthenticatedUser(user),
        error: getAuthenticatedUser.error,
        loading: getAuthenticatedUser.isLoading
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
