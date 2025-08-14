import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router'

export type WireframeModeLinkProps = {
  to: string
}

export function WireframeModeLink (props: WireframeModeLinkProps) {
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
            <PlayIcon />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Wireframe Mode
      </TooltipContent>
    </Tooltip>

  )
}
