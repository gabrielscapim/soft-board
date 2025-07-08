import { createContext } from 'react'
import { GetTeamResult } from 'types/endpoints'

export type TeamContextValue = {
  team?: GetTeamResult
  error?: unknown
  loading?: boolean
}

export const TeamContext = createContext<TeamContextValue>({})
