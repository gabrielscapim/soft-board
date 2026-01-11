import { BoardZoomController } from '@/components'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getRootImage, MAX_SCALE, MIN_SCALE } from '@/helpers'
import clsx from 'clsx'
import { GetSharedBoardByTokenResult } from 'types/endpoints'

export type SharedBoardHeaderProps = {
  board: GetSharedBoardByTokenResult['board']
  scale: number
  currentMode: 'board' | 'preview' | 'requirements'
  onChangeMode?: (mode: 'board' | 'preview' | 'requirements') => void
  onChangeBoardScale?: (scale: number) => void
}

const TABS = [
  {
    value: 'board',
    label: 'Board'
  },
  {
    value: 'preview',
    label: 'Preview'
  },
  {
    value: 'requirements',
    label: 'Requirements'
  }
] as const

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

      <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onChangeMode?.(tab.value as 'board' | 'preview')}
            data-state={currentMode === tab.value ? 'active' : 'inactive'}
            className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4"
          >
            <span className="select-none">{tab.label}</span>
          </button>
        ))}
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
