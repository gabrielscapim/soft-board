import { PropsWithChildren, useState } from 'react'
import { BoardController, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'

export type BoardContextProvider = PropsWithChildren

export function BoardContextProvider ({ children }: BoardContextProvider) {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <BoardContext.Provider value={{ boardState, boardController }}>
      {children}
    </BoardContext.Provider>
  )
}
