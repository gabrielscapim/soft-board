import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { SquarePenIcon } from 'lucide-react'
import { Link } from 'react-router'

export type EditBoardLinkProps = {
  to: string
}

export function EditBoardLink (props: EditBoardLinkProps) {
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
            <SquarePenIcon />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Edit Board
      </TooltipContent>
    </Tooltip>
  )
}
