import { useEffect } from 'react'
import { BoardState } from '../lib'
import { ElementResizer } from '../lib/element-resizer'

export function useElementResizer (
  boardState: BoardState,
  flexBoardContainerElement: HTMLDivElement | null
) {
  useEffect(() => {
    if (flexBoardContainerElement) {
      const elementResizer = new ElementResizer(boardState, flexBoardContainerElement)

      flexBoardContainerElement.addEventListener('mousedown', elementResizer.startResize)
      flexBoardContainerElement.addEventListener('mousemove', elementResizer.onResizing)
      flexBoardContainerElement.addEventListener('mouseup', elementResizer.endResize)
      flexBoardContainerElement.addEventListener('mouseleave', elementResizer.endResize)

      return () => {
        flexBoardContainerElement.removeEventListener('mousedown', elementResizer.startResize)
        flexBoardContainerElement.removeEventListener('mousemove', elementResizer.onResizing)
        flexBoardContainerElement.removeEventListener('mouseup', elementResizer.endResize)
        flexBoardContainerElement.removeEventListener('mouseleave', elementResizer.endResize)
      }
    }
  }, [flexBoardContainerElement, boardState])
}
