import { useEffect } from 'react'
import { BoardState, SelectionBoard } from '../lib'

export function useSelectionBoard (
  boardState: BoardState,
  boardRef: React.RefObject<HTMLDivElement>,
  selectionBoxRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const boardElement = boardRef.current
    const selectionBoxElement = selectionBoxRef.current

    if (!boardElement || !selectionBoxElement) return

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
  }, [boardState, boardRef, selectionBoxRef])
}
