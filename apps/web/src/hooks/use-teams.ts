import { useQuery } from '@tanstack/react-query'
import { useAuthentication, useClient } from '.'

export function useTeams () {
  const { authenticatedUser } = useAuthentication()
  const client = useClient()

  const getTeams = useQuery({
    queryKey: ['getTeams', authenticatedUser?.userId],
    queryFn: () => client.getTeams(),
    enabled: !!authenticatedUser
  })

  return getTeams
}
