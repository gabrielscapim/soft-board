import { useSyncExternalStore } from 'react'
import { BoardState } from '../../../lib'
import { BoardEvent } from '@/types'

export function useBoardStore<T> (
  boardState: BoardState,
  event: BoardEvent,
  getSnapshot: (state: BoardState) => T
) {
  return useSyncExternalStore(
    (callback) => {
      boardState.addListener(event, callback)
      return () => boardState.removeListener(event, callback)
    },
    () => getSnapshot(boardState),
    () => getSnapshot(boardState)
  )
}
