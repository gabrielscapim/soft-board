import { useEffect, useState } from 'react'
import { BoardState } from '../../../lib'

export function useSelectedFlexComponents (boardState: BoardState) {
  const [selectedFlexComponent, setSelectedFlexComponent] = useState(boardState.selectedFlexComponents)

  useEffect(() => {
    const onChange = () => {
      setSelectedFlexComponent(boardState.selectedFlexComponents)
    }

    boardState.addListener('selectedFlexComponentsChanged', onChange)

    return () => {
      boardState.removeListener('selectedFlexComponentsChanged', onChange)
    }
  }, [boardState])

  return selectedFlexComponent
}
