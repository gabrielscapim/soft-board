import { useEffect } from 'react'
import { BoardState, DraggableBoard } from '../lib'

export function useDraggableFlexBoard (
  boardState: BoardState,
  flexBoardRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const element = flexBoardRef.current

    if (!element) return

    const draggableBoard = new DraggableBoard(boardState, element)

    element.addEventListener('mousedown', draggableBoard.startDrag)
    element.addEventListener('mousemove', draggableBoard.onDragging)
    element.addEventListener('mouseup', draggableBoard.endDrag)
    element.addEventListener('mouseleave', draggableBoard.endDrag)

    return () => {
      element.removeEventListener('mousedown', draggableBoard.startDrag)
      element.removeEventListener('mousemove', draggableBoard.onDragging)
      element.removeEventListener('mouseup', draggableBoard.endDrag)
      element.removeEventListener('mouseleave', draggableBoard.endDrag)
    }
  }, [flexBoardRef, boardState])
}
