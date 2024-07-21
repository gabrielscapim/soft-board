import { useEffect } from 'react'
import { DraggableBoard } from '../lib'

export function useDraggableFlexBoard (
  flexBoard: SVGSVGElement | null
) {
  useEffect(() => {
    if (flexBoard) {

      const draggableBoard = new DraggableBoard(flexBoard)

      flexBoard.addEventListener('mousedown', draggableBoard.startDrag)
      flexBoard.addEventListener('mousemove', draggableBoard.onDragging)
      flexBoard.addEventListener('mouseup', draggableBoard.endDrag)
      flexBoard.addEventListener('mouseleave', draggableBoard.endDrag)

      return () => {
        flexBoard.removeEventListener('mousedown', draggableBoard.startDrag)
        flexBoard.removeEventListener('mousemove', draggableBoard.onDragging)
        flexBoard.removeEventListener('mouseup', draggableBoard.endDrag)
        flexBoard.removeEventListener('mouseleave', draggableBoard.endDrag)
      }
    }
  }, [flexBoard])
}
