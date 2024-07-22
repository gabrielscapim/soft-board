import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useSelectedFlexComponent (boardState: BoardState) {
  const [selectedFlexComponent, setSelectedFlexComponent] = useState(boardState.selectedFlexComponent)

  useEffect(() => {
    const onChange = () => {
      setSelectedFlexComponent(boardState.selectedFlexComponent)
    }

    boardState.addListener('selectedFlexComponentChanged', onChange)

    return () => {
      boardState.removeListener('selectedFlexComponentChanged')
    }
  }, [boardState])

  return selectedFlexComponent
}
