import { useEffect } from 'react'
import { BoardState, ZoomBoard } from '@/lib'

export function useZoomBoard (
  boardState: BoardState,
  flexBoardContainerRef: React.RefObject<HTMLDivElement>,
  flexBoardRef: React.RefObject<HTMLDivElement>,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const containerElement = flexBoardContainerRef.current
    const boardElement = flexBoardRef.current

    if (!containerElement || !boardElement) return

    const zoomBoard = new ZoomBoard(boardState, containerElement)

    containerElement.addEventListener('wheel', zoomBoard.applyZoom)
    containerElement.addEventListener('mousedown', zoomBoard.startBoardMove)
    containerElement.addEventListener('mousemove', zoomBoard.moveBoard)
    document.addEventListener('mouseup', zoomBoard.endMove)

    return () => {
      containerElement.removeEventListener('wheel', zoomBoard.applyZoom)
      containerElement.removeEventListener('mousedown', zoomBoard.startBoardMove)
      containerElement.removeEventListener('mousemove', zoomBoard.moveBoard)
      document.removeEventListener('mouseup', zoomBoard.endMove)
    }
  }, [boardState, flexBoardContainerRef, flexBoardRef, enable])
}
