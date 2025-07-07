import { PropsWithChildren } from 'react'
import { BoardController, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'

export type BoardContextProvider = PropsWithChildren<{
  boardState: BoardState
  boardController: BoardController
}>

export function BoardContextProvider ({ boardState, boardController, children }: BoardContextProvider) {
  return (
    <BoardContext.Provider value={{ boardState, boardController }}>
      {children}
    </BoardContext.Provider>
  )
}
