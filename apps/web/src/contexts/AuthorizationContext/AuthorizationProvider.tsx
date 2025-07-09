import { useAuthentication, useClient, useTeam } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AuthorizationContext } from './AuthorizationContext'

export type AuthorizationProviderProps = PropsWithChildren

export function AuthorizationProvider ({ children }: AuthorizationProviderProps) {
  const { authenticatedUser } = useAuthentication()
  const client = useClient()
  const team = useTeam()

  const getCurrentUserRole = useQuery({
    queryKey: ['getCurrentUserRole', team.team, authenticatedUser?.userId],
    queryFn: async () => {
      if (!team.team || !authenticatedUser?.userId) {
        return null
      }

      return await client.getCurrentUserRole()
    },
    enabled: !!team.team && !!authenticatedUser?.userId
  })
  const currentUserRole = getCurrentUserRole.data

  return (
    <AuthorizationContext.Provider
      value={{
        currentUserRole,
        error: getCurrentUserRole.error,
        loading: getCurrentUserRole.isLoading
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  )
}
