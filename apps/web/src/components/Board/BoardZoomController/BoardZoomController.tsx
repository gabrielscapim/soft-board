import { MinusIcon, PlusIcon } from 'lucide-react'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { useTranslation } from 'react-i18next'

export type BoardZoomControllerProps = {
  scale?: number
  onZoomIn?: () => void
  onZoomOut?: () => void
}

export function BoardZoomController (props: BoardZoomControllerProps) {
  const { scale = 1, onZoomIn, onZoomOut } = props

  const { t } = useTranslation('components')

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
          {t('board.zoomController.zoomOut')}
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
          {t('board.zoomController.zoomIn')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
