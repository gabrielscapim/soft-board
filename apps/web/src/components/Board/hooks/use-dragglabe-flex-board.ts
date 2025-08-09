import { useEffect } from 'react'
import { BoardManager, BoardState, DraggableBoard } from '../../../lib'

export function useDraggableFlexBoard (
  boardState: BoardState,
  boardManager: BoardManager,
  flexBoardRef: React.RefObject<HTMLDivElement>,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const element = flexBoardRef.current

    if (!element) return

    const draggableBoard = new DraggableBoard({
      boardElement: element,
      boardState,
      boardManager
    })

    element.addEventListener('mousedown', draggableBoard.startDrag)
    window.addEventListener('mousemove', draggableBoard.onDragging)
    window.addEventListener('mouseup', draggableBoard.endDrag)

    return () => {
      element.removeEventListener('mousedown', draggableBoard.startDrag)
      window.removeEventListener('mousemove', draggableBoard.onDragging)
      window.removeEventListener('mouseup', draggableBoard.endDrag)
    }
  }, [flexBoardRef, boardState, boardManager, enable])
}
