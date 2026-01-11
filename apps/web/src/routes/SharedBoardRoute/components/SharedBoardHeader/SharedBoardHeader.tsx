import { BoardZoomController } from '@/components'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getRootImage, MAX_SCALE, MIN_SCALE } from '@/helpers'
import clsx from 'clsx'
import { PlayIcon, SquareMousePointerIcon } from 'lucide-react'
import { GetSharedBoardByTokenResult } from 'types/endpoints'

export type SharedBoardHeaderProps = {
  board: GetSharedBoardByTokenResult['board']
  scale: number
  currentMode: 'board' | 'preview'
  onChangeMode?: (mode: 'board' | 'preview') => void
  onChangeBoardScale?: (scale: number) => void
}

export function SharedBoardHeader (props: SharedBoardHeaderProps) {
  const {
    board,
    scale,
    currentMode,
    onChangeBoardScale,
    onChangeMode
  } = props

  return (
    <header className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={getRootImage(board.image)} />
        </Avatar>

        <span className="text-sm font-normal">
          {board.title ?? <span className="opacity-30">Untitled Board</span>}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChangeMode?.(currentMode === 'board' ? 'preview' : 'board')}
        >
          {currentMode === 'preview' && <><PlayIcon />Preview</>}
          {currentMode === 'board' && <><SquareMousePointerIcon />Board</>}
        </Button>
      </div>

      <div className={clsx(currentMode === 'preview' && 'opacity-0')}>
        <BoardZoomController
          scale={scale}
          onZoomIn={() => onChangeBoardScale?.(Math.min(scale + 0.25, MAX_SCALE))}
          onZoomOut={() => onChangeBoardScale?.(Math.max(scale - 0.25, MIN_SCALE))}
        />
      </div>
    </header>
  )
}
