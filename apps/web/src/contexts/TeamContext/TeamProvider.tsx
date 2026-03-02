import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { useParams } from 'react-router'
import { TeamContext } from './TeamContext'
import { FullScreenLoader } from '@/components'
import { Client } from '@/client'
import { ErrorRoute } from '@/routes'

export type TeamProviderProps = PropsWithChildren

export function TeamProvider ({ children }: TeamProviderProps) {
  const params = useParams<{ teamSlug?: string }>()
  const teamSlug = params.teamSlug

  const client = useClient()

  const getTeam = useQuery({
    queryKey: ['getTeam', teamSlug],
    queryFn: async () => {
      if (teamSlug) {
        client.teamSlug = teamSlug
        return await client.getTeam()
      }

      client.teamSlug = undefined
    },
    enabled: !!teamSlug || !client.teamSlug, // If teamSlug is provided in the URL, use it; otherwise, use the one set in the client,
    retry: 1
  })

  const error = Client.getError(getTeam.error)

  return (
    <TeamContext.Provider
      value={{
        team: getTeam.data,
        error: getTeam.error,
        loading: getTeam.isLoading,
        refetch: getTeam.refetch
      }}
    >
      {getTeam.error && (
        <ErrorRoute
          status={error?.response?.status}
          description={Client.isForbidden(error)
            ? 'Team not found or you do not have permission to access it.'
            : 'An error occurred while fetching the team.'
          }
        />
      )}
      {getTeam.isLoading && <FullScreenLoader />}
      {getTeam.data && children}
    </TeamContext.Provider>
  )
}
