import { useState, useEffect } from 'react'
import { BoardState } from '../lib'

export function useIsResizing (boardState: BoardState) {
  const [isResizing, setIsResizing] = useState(boardState.isResizing)

  useEffect(() => {
    const onChange = () => {
      setIsResizing(boardState.isResizing)
    }

    boardState.addListener('isResizingChanged', onChange)

    return () => {
      boardState.removeListener('isResizingChanged', onChange)
    }
  }, [boardState])

  return isResizing
}
