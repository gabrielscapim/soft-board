import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useScale (boardState: BoardState) {
  const [scale, setScale] = useState(boardState.scale)

  useEffect(() => {
    const onChange = () => {
      setScale(boardState.scale)
    }

    boardState.addListener('scaleChanged', onChange)

    return () => {
      boardState.removeListener('scaleChanged', onChange)
    }
  }, [boardState])

  return scale
}
