import { useEffect } from 'react'
import { BoardState, DraggableBoard } from '../lib'

export function useDraggableFlexBoard (
  boardState: BoardState,
  flexBoardElement: HTMLDivElement | null
) {
  useEffect(() => {
    if (flexBoardElement) {
      const draggableBoard = new DraggableBoard(boardState, flexBoardElement)

      flexBoardElement.addEventListener('mousedown', draggableBoard.startDrag)
      flexBoardElement.addEventListener('mousemove', draggableBoard.onDragging)
      flexBoardElement.addEventListener('mouseup', draggableBoard.endDrag)
      flexBoardElement.addEventListener('mouseleave', draggableBoard.endDrag)

      return () => {
        flexBoardElement.removeEventListener('mousedown', draggableBoard.startDrag)
        flexBoardElement.removeEventListener('mousemove', draggableBoard.onDragging)
        flexBoardElement.removeEventListener('mouseup', draggableBoard.endDrag)
        flexBoardElement.removeEventListener('mouseleave', draggableBoard.endDrag)
      }
    }
  }, [flexBoardElement, boardState])
}
