import { createContext } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'

type BoardContextValue = {
  boardState: BoardState
  boardController: BoardController
  boardManager: BoardManager
}

export const BoardContext = createContext<BoardContextValue | null>(null)
