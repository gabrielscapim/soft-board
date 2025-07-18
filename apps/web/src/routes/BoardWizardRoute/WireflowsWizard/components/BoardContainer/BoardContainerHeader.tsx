import { BoardZoomController } from '@/components'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { useScale } from '@/hooks'
import { BoardController, BoardState } from '@/lib'
import { Maximize2 } from 'lucide-react'
import { Link } from 'react-router'

export type BoardContainerHeaderProps = {
  boardState: BoardState
  boardController: BoardController
}

export function BoardContainerHeader (props: BoardContainerHeaderProps) {
  const { boardState, boardController } = props

  const scale = useScale(boardState)

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

        <BoardZoomController
          scale={scale}
          onZoomIn={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
          onZoomOut={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
        />
      </div>
    </header>
  )
}
