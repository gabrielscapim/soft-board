import { useAuthentication } from '@/hooks'
import { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export type AuthenticationGuardLayoutProps = PropsWithChildren

export function AuthenticationGuardLayout (props: AuthenticationGuardLayoutProps) {
  const { children } = props

  const { authenticatedUser, loading } = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }

    if (!authenticatedUser) {
      navigate('/sign-in', { replace: true })
    }
  }, [authenticatedUser, navigate, loading])

  return (
    <>
      {!loading && authenticatedUser && (
        <>
          {children}
          <Outlet />
        </>
      )}
      {loading && <div>Loading...</div>}
    </>
  )
}
