import { createContext } from 'react'
import { BoardController, BoardState } from '../../lib'

type BoardContextValue = {
  boardState: BoardState
  boardController: BoardController
}

const boardState = new BoardState()

export const BoardContext = createContext<BoardContextValue>({
  boardState,
  boardController: new BoardController(boardState)
})
