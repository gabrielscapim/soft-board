import { MinusIcon, PlusIcon } from 'lucide-react'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

export type BoardZoomControllerProps = {
  scale?: number
  onZoomIn?: () => void
  onZoomOut?: () => void
}

export function BoardZoomController (props: BoardZoomControllerProps) {
  const { scale = 1, onZoomIn, onZoomOut } = props

  return (
    <div
      data-tutorial={TUTORIALS_ANCHORS.BoardZoomController}
      className="flex justify-center items-center gap-3"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="size-7"
            variant="outline"
            onClick={() => onZoomOut?.()}
          >
            <MinusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Zoom Out
        </TooltipContent>
      </Tooltip>

      <span className="text-xs">{Math.round(scale * 100)}%</span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="size-7"
            variant="outline"
            onClick={() => onZoomIn?.()}
          >
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Zoom In
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
