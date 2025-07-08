import { useAuthentication } from '@/hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { FullScreenLoader } from '../FullScreenLoader'

export function AuthenticationGuardLayout () {
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
          <Outlet />
        </>
      )}
      {loading && <FullScreenLoader />}
    </>
  )
}
