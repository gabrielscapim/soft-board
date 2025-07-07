import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useGuides (boardState: BoardState) {
  const [guides, setGuides] = useState(boardState.guides)

  useEffect(() => {
    const onChange = () => {
      setGuides(boardState.guides)
    }

    boardState.addListener('guidesChanged', onChange)

    return () => {
      boardState.removeListener('guidesChanged', onChange)
    }
  }, [boardState])

  return guides
}
