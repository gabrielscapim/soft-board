import { createContext } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { GetBoardResult } from 'types/endpoints'

type BoardContextValue = {
  boardState: BoardState
  boardController: BoardController
  boardManager: BoardManager
  error: unknown
  loading: boolean
  board?: GetBoardResult
  refetch: () => void
}

export const BoardContext = createContext<BoardContextValue | null>(null)
