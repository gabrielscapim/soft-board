import { SquareMousePointer } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export type BoardLinkProps = {
  to: string
}

export function BoardLink (props: BoardLinkProps) {
  const { to } = props

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to} relative="path">
          <Button
            size="icon"
            className="size-7"
            variant="outline"
          >
            <SquareMousePointer />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Back to Board
      </TooltipContent>
    </Tooltip>
  )
}
