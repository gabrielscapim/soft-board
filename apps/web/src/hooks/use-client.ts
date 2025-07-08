import { ClientContext } from '@/contexts'
import { useContext } from 'react'

export function useClient () {
  return useContext(ClientContext)
}
