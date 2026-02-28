import { BoardManager, BoardState, ElementResizer } from '@/lib'
import { useEffect } from 'react'

export function useElementResizer (
  boardState: BoardState,
  boardManager: BoardManager,
  softBoardContainerRef: React.RefObject<HTMLDivElement>,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const element = softBoardContainerRef.current

    if (!element) return

    const elementResizer = new ElementResizer({
      boardState,
      boardManager,
      boardElement: element
    })

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
  }, [softBoardContainerRef, boardState, boardManager, enable])
}
