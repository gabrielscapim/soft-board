import { Link } from 'react-router'
import { Button } from '../ui/button'
import { useSidebar } from '../ui/sidebar'
import { ZoomController } from './components'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Minimize2, PanelRightClose, PanelRightOpen } from 'lucide-react'

export function EditBoardHeader () {
  const { open, toggleSidebar } = useSidebar()

  return (
    <header className="bg-background sticky top-0 shrink-0 p-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-sidebar="trigger"
                data-slot="sidebar-trigger"
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => toggleSidebar()}
              >
                {open ? <PanelRightOpen /> : <PanelRightClose />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {open ? 'Close Sidebar' : 'Open Sidebar'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to=".." relative="path">
                <Button
                  size="icon"
                  className="size-7"
                  variant="outline"
                >
                  <Minimize2 />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Minimize Board
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <ZoomController />
        </div>
      </div>
    </header>
  )
}
