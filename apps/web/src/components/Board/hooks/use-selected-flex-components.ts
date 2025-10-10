import { useEffect, useState } from 'react'
import { BoardState } from '../../../lib'

export function useSelectedFlexComponents (boardState: BoardState) {
  const [selectedFlexComponents, setSelectedFlexComponents] = useState(boardState.selectedFlexComponents)

  useEffect(() => {
    const onChange = () => {
      setSelectedFlexComponents(boardState.selectedFlexComponents)
    }

    boardState.addListener('selectedFlexComponentsChanged', onChange)

    return () => {
      boardState.removeListener('selectedFlexComponentsChanged', onChange)
    }
  }, [boardState])

  return selectedFlexComponents
}
