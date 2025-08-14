import { useState, useEffect } from 'react'
import { BoardState } from '../../../lib'

export function useIsDragging (boardState: BoardState) {
  const [isDragging, setIsDragging] = useState(boardState.isDragging)

  useEffect(() => {
    const onChange = () => {
      setIsDragging(boardState.isDragging)
    }

    boardState.addListener('isDraggingChanged', onChange)

    return () => {
      boardState.removeListener('isDraggingChanged', onChange)
    }
  }, [boardState])

  return isDragging
}
