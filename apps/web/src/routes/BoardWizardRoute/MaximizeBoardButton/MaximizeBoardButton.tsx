import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Maximize2 } from 'lucide-react'
import { Link } from 'react-router'

export function MaximizeBoardButton () {
  return (
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
  )
}
