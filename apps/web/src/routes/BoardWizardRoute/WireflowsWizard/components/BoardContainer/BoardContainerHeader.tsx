import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Maximize2 } from 'lucide-react'
import { Link } from 'react-router'

export function BoardContainerHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 p-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="edit">
                <Button
                  size="icon"
                  className="size-7"
                  variant="outline"
                >
                  <Maximize2 />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Maximize Board
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
