import { PropsWithChildren } from 'react'
import { BoardState } from '../../lib'
import { BoardContext } from './BoardContext'

export type BoardContextProvider = PropsWithChildren<{
  boardState: BoardState
}>

export function BoardContextProvider ({ boardState, children }: BoardContextProvider) {
  return (
    <BoardContext.Provider value={boardState}>
      {children}
    </BoardContext.Provider>
  )
}
