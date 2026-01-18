import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { GetAuthenticatedUserResult } from 'types/endpoints'
import { AuthenticationContext } from './AuthenticationContext'
import { useTranslation } from 'react-i18next'

export type AuthenticationProviderProps = PropsWithChildren

export function AuthenticationProvider ({ children }: AuthenticationProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<GetAuthenticatedUserResult>(null)

  const { i18n } = useTranslation()
  const client = useClient()
  const getAuthenticatedUser = useQuery({
    queryKey: ['getAuthenticatedUser'],
    queryFn: async () => client.getAuthenticatedUser()
  })

  useEffect(() => {
    setAuthenticatedUser(getAuthenticatedUser.data ?? null)
    i18n.changeLanguage(getAuthenticatedUser.data?.preferences.language)
  }, [getAuthenticatedUser.data, i18n])

  return (
    <AuthenticationContext.Provider
      value={{
        authenticatedUser: getAuthenticatedUser.data ?? authenticatedUser,
        error: getAuthenticatedUser.error,
        loading: getAuthenticatedUser.isLoading,
        refetch: getAuthenticatedUser.refetch,
        setAuthenticatedUser: user => setAuthenticatedUser(user)
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
