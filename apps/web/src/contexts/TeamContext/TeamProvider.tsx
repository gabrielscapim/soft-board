import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect } from 'react'
import { useParams } from 'react-router'
import { TeamContext } from './TeamContext'

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

      return undefined
    },
    enabled: !!teamSlug || !client.teamSlug // If teamSlug is provided in the URL, use it; otherwise, use the one set in the client
  })

  useEffect(() => {
    if (teamSlug) {
      client.teamSlug = teamSlug
    } else {
      client.teamSlug = undefined
    }
  }, [client, teamSlug])

  return (
    <TeamContext.Provider
      value={{
        team: getTeam.data,
        error: getTeam.error,
        loading: getTeam.isLoading
      }}
    >
      {getTeam.data && (
        children
      )}
    </TeamContext.Provider>
  )
}
