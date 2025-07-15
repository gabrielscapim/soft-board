import { useEffect } from 'react'
import { BoardState } from '../lib'
import { ZoomBoard } from '../lib'

export function useZoomBoard (
  boardState: BoardState,
  flexBoardContainerElement: HTMLDivElement | null,
  flexBoardElement: HTMLDivElement | null
) {
  useEffect(() => {
    if (flexBoardContainerElement && flexBoardElement) {
      const zoomBoard = new ZoomBoard(boardState, flexBoardContainerElement)

      flexBoardContainerElement.addEventListener('wheel', zoomBoard.applyZoom)
      flexBoardContainerElement.addEventListener('mousedown', zoomBoard.startBoardMove)
      flexBoardContainerElement.addEventListener('mousemove', zoomBoard.moveBoard)
      document.addEventListener('mouseup', zoomBoard.endMove)

      return () => {
        flexBoardContainerElement.removeEventListener('wheel', zoomBoard.applyZoom)
        flexBoardContainerElement.removeEventListener('mousedown', zoomBoard.startBoardMove)
        flexBoardContainerElement.removeEventListener('mousemove', zoomBoard.moveBoard)
        document.removeEventListener('mouseup', zoomBoard.endMove)
      }
    }
  }, [boardState, flexBoardContainerElement, flexBoardElement])
}
