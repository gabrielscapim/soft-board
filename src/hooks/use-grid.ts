import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useGrid (boardState: BoardState) {
  const [grid, setGrid] = useState(boardState.grid)

  useEffect(() => {
    const onChange = () => {
      setGrid(boardState.grid)
    }

    boardState.addListener('flexComponentsChanged', onChange)

    return () => {
      boardState.removeListener('flexComponentsChanged')
    }
  })

  return grid
}
