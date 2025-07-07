import { Link } from 'react-router'
import { Button } from '../ui/button'
import { SidebarTrigger } from '../ui/sidebar'
import { ZoomController } from './components'
import { FullscreenIcon } from 'lucide-react'

export function BoardHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 border-b p-2">
      <div className="flex justify-between items-center w-full">
        <SidebarTrigger className="m-0 cursor-pointer" />
        <div className="flex items-center gap-4">
          <ZoomController />
          <Link to="/wireframe-mode" className="flex items-center">
            <Button size="sm" variant="outline" className="text-xs">
              <FullscreenIcon size={16} />
              Wireframe Mode
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
