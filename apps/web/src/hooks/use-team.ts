import { TeamContext } from '@/contexts'
import { useContext } from 'react'

export function useTeam () {
  return useContext(TeamContext)
}
