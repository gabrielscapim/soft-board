import { BoardCanvas, BoardCanvasProps, BoardZoomController, EditBoardLink, PreviewModeLink, useBoardStore } from '@/components'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { useClient } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeftIcon, PlusIcon, SparklesIcon } from 'lucide-react'
import { useState } from 'react'
import { GetBoardResult } from 'types/endpoints'
import { AddGenerationToBoardDialog } from './AddGenerationToBoardDialog'
import { toast } from 'sonner'

export type BoardContainerProps = BoardCanvasProps & {
  hasPermission?: boolean
  board?: GetBoardResult
  onReturnToBoard?: () => void
}

export function BoardContainer (props: BoardContainerProps) {
  const {
    hasPermission,
    board,
    boardController,
    boardState,
    boardManager,
    enableSelection = true,
    enableResizing = true,
    enableDraggable = true,
    enableKeyboardShortcuts = true,
    onReturnToBoard
  } = props

  const [addGenerationDialogOpen, setAddGenerationDialogOpen] = useState(false)
  const client = useClient()
  const scale = useBoardStore(boardState, 'scaleChanged', state => state.scale)

  const addGenerationToBoard = useMutation({
    mutationFn: async () => {
      if (!board?.generation) return

      await client.addGenerationToBoard({
        boardId: board.id,
        boardGenerationId: board.generation.id
      })
    },
    onSuccess: () => {
      setAddGenerationDialogOpen(false)
      onReturnToBoard?.()
      toast.success('Generation added to board successfully')
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail || 'Failed to add generation to board')
  })

  const generation = board?.generation

  return (
    <>
      <div className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
        {!generation && (
          <>
            <div className="flex flex-row gap-2">
              {board?.step === 'wireflows' && <EditBoardLink to="edit" /> }
              <PreviewModeLink to="preview" />
            </div>

            <BoardZoomController
              scale={scale}
              onZoomIn={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
              onZoomOut={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
            />
          </>
        )}

        {generation && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onReturnToBoard}
            >
              <ChevronLeftIcon />
              Return
            </Button>
            <Badge variant="outline" className="border-none opacity-60">
              <SparklesIcon />
              Wireflow generation
            </Badge>
            <Button
              variant="outline"
              size="sm"
              disabled={hasPermission === false || addGenerationToBoard.isPending}
              onClick={() => setAddGenerationDialogOpen(true)}
            >
              <PlusIcon />
              Add to board
            </Button>
          </>
        )}
      </div>

      <AddGenerationToBoardDialog
        open={addGenerationDialogOpen}
        isMutating={addGenerationToBoard.isPending}
        onCancel={() => setAddGenerationDialogOpen(false)}
        onConfirm={() => addGenerationToBoard.mutate()}
      />

      <BoardCanvas
        boardState={boardState}
        boardController={boardController}
        boardManager={boardManager}
        enableZoom
        enableSelection={generation ? false : enableSelection && hasPermission}
        enableResizing={generation ? false : enableResizing && hasPermission}
        enableDraggable={generation ? false : enableDraggable && hasPermission}
        enableKeyboardShortcuts={generation ? false : enableKeyboardShortcuts && hasPermission}
      />
    </>
  )
}
