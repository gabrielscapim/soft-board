import { useEffect } from 'react'
import { BoardState } from '../lib'
import { ElementResizer } from '../lib/element-resizer'

export function useElementResizer (
  boardState: BoardState,
  flexBoardElement: SVGSVGElement | null
) {
  useEffect(() => {
    if (flexBoardElement) {
      const elementResizer = new ElementResizer(boardState, flexBoardElement)

      flexBoardElement.addEventListener('mousedown', elementResizer.startResize)
      flexBoardElement.addEventListener('mousemove', elementResizer.onResizing)
      flexBoardElement.addEventListener('mouseup', elementResizer.endResize)
      flexBoardElement.addEventListener('mouseleave', elementResizer.endResize)

      return () => {
        flexBoardElement.removeEventListener('mousedown', elementResizer.startResize)
        flexBoardElement.removeEventListener('mousemove', elementResizer.onResizing)
        flexBoardElement.removeEventListener('mouseup', elementResizer.endResize)
        flexBoardElement.removeEventListener('mouseleave', elementResizer.endResize)
      }
    }
  }, [flexBoardElement, boardState])
}
