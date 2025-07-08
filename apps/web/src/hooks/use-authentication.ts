import { AuthenticationContext } from '@/contexts'
import { useContext } from 'react'

export function useAuthentication () {
  return useContext(AuthenticationContext)
}
