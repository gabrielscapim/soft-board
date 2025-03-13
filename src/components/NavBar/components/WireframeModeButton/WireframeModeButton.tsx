import { PlayIcon, SquareDashedMousePointer } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

export function WireframeModeButton () {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      {location.pathname === '/' && (
        <div className="tooltip tooltip-bottom" data-tip="Wireframe mode">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => navigate('/wireframe-mode')}
          >
            <PlayIcon size={20} />
          </button>
        </div>
      )}

      {location.pathname === '/wireframe-mode' && (
        <div className="tooltip tooltip-bottom" data-tip="Board mode">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => navigate('/')}
          >
            <SquareDashedMousePointer size={20} />
          </button>
        </div>
      )}
    </>
  )
}
