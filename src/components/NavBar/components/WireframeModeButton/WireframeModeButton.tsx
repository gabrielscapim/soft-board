import { PlayIcon, SquarePen } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

export function WireframeModeButton () {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      {location.pathname === '/' && (
        <button
          className="btn btn-ghost btn-circle btn-sm"
          onClick={() => navigate('/wireframe-mode')}
        >
          <PlayIcon size={20} />
        </button>
      )}

      {location.pathname === '/wireframe-mode' && (
        <button
          className="btn btn-ghost btn-circle btn-sm"
          onClick={() => navigate('/')}
        >
          <SquarePen size={20} />
        </button>
      )}
    </>
  )
}
