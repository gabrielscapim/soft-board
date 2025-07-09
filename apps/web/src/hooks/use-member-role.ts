import { useContext } from 'react'
import { AuthorizationContext } from '@/contexts'

export function useMemberRole () {
  const authorization = useContext(AuthorizationContext)
  const role = authorization.currentUserRole?.role

  return role
}
