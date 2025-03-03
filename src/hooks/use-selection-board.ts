import { useEffect } from 'react'
import { BoardState, SelectionBoard } from '../lib'

export function useSelectionBoard (
  boardState: BoardState,
  boardElement: HTMLDivElement | null,
  selectionBoxElement: HTMLDivElement | null
) {
  useEffect(() => {
    if (boardElement && selectionBoxElement) {
      const selectionBoard = new SelectionBoard(boardState, boardElement, selectionBoxElement)

      boardElement.addEventListener('mousedown', selectionBoard.onMouseDown)
      boardElement.addEventListener('mousemove', selectionBoard.onMouseMove)
      boardElement.addEventListener('mouseup', selectionBoard.onMouseUp)
      boardElement.addEventListener('mouseleave', selectionBoard.onMouseUp)

      return () => {
        boardElement.removeEventListener('mousedown', selectionBoard.onMouseDown)
        boardElement.removeEventListener('mousemove', selectionBoard.onMouseMove)
        boardElement.removeEventListener('mouseup', selectionBoard.onMouseUp)
        boardElement.removeEventListener('mouseleave', selectionBoard.onMouseUp)
      }
    }
  }, [boardState, boardElement, selectionBoxElement])
}
