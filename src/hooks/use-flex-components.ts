import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useFlexComponents (boardState: BoardState) {
  const [flexComponents, setFlexComponents] = useState(boardState.flexComponents)

  useEffect(() => {
    const handleChange = () => {
      setFlexComponents(boardState.flexComponents)
    }

    boardState.addListener('flexComponentsChanged', handleChange)

    return () => {
      boardState.removeListener('flexComponentsChanged')
    }
  }, [boardState])

  return flexComponents
}
