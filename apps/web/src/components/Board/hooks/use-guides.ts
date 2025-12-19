import { useSyncExternalStore } from 'react'
import { BoardState } from '../../../lib'

export function useGuides (boardState: BoardState) {
  return useSyncExternalStore(
    (callback) => {
      boardState.addListener('guidesChanged', callback)

      return () => {
        boardState.removeListener('guidesChanged', callback)
      }
    },
    () => boardState.guides,
    () => boardState.guides
  )
}
