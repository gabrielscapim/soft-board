import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useFlexComponents (state: BoardState) {
  const [flexComponents, setFlexComponents] = useState(state.flexComponents)

  useEffect(() => {
    setFlexComponents(state.flexComponents)
  }, [state.flexComponents])

  return flexComponents
}
