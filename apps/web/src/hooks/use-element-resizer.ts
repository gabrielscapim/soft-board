import { useEffect } from 'react'
import { BoardState, ElementResizer } from '../lib'

export function useElementResizer (
  boardState: BoardState,
  flexBoardContainerRef: React.RefObject<HTMLDivElement>,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const element = flexBoardContainerRef.current

    if (!element) return

    const elementResizer = new ElementResizer(boardState, element)

    element.addEventListener('mousedown', elementResizer.startResize)
    element.addEventListener('mousemove', elementResizer.onResizing)
    element.addEventListener('mouseup', elementResizer.endResize)
    element.addEventListener('mouseleave', elementResizer.endResize)

    return () => {
      element.removeEventListener('mousedown', elementResizer.startResize)
      element.removeEventListener('mousemove', elementResizer.onResizing)
      element.removeEventListener('mouseup', elementResizer.endResize)
      element.removeEventListener('mouseleave', elementResizer.endResize)
    }
  }, [flexBoardContainerRef, boardState, enable])
}
