import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useFlexComponents (boardState: BoardState) {
  const [flexComponents, setFlexComponents] = useState(boardState.flexComponents)

  useEffect(() => {
    setFlexComponents(boardState.flexComponents)
  }, [boardState.flexComponents])

  return flexComponents
}
