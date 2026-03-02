import { createContext } from 'react'
import { GetTeamResult } from 'types/endpoints'

export type TeamContextValue = {
  team?: GetTeamResult
  error?: unknown
  loading?: boolean
  refetch?: () => void
}

export const TeamContext = createContext<TeamContextValue>({})
