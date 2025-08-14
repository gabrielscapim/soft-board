import { useEffect, useState } from 'react'
import { BoardState } from '../../../lib'

export function useFlexComponents (boardState: BoardState) {
  const [flexComponents, setFlexComponents] = useState(boardState.flexComponents)

  useEffect(() => {
    const onChange = () => {
      setFlexComponents(boardState.flexComponents)
    }

    boardState.addListener('flexComponentsChanged', onChange)

    return () => {
      boardState.removeListener('flexComponentsChanged', onChange)
    }
  }, [boardState])

  return flexComponents
}
