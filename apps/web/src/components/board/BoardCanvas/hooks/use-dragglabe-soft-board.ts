import { useEffect } from 'react'
import { BoardManager, BoardState, DraggableBoard } from '../../../../lib'

export function useDraggableSoftBoard (
  boardState: BoardState,
  boardManager: BoardManager,
  softBoardRef: React.RefObject<HTMLDivElement>,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const element = softBoardRef.current

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
  }, [softBoardRef, boardState, boardManager, enable])
}
