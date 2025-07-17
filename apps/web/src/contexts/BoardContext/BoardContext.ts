import { createContext } from 'react'
import { BoardController, BoardState } from '../../lib'

type BoardContextValue = {
  boardState: BoardState
  boardController: BoardController
}

export const BoardContext = createContext<BoardContextValue | null>(null)
