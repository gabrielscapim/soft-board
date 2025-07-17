import { PropsWithChildren, useEffect, useState } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useParams } from 'react-router'
import { useClient } from '@/hooks'

export type BoardContextProvider = PropsWithChildren

export function BoardContextProvider ({ children }: BoardContextProvider) {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const client = useClient()

  const [board, setBoard] = useState(() => {
    const boardState = new BoardState({ id: boardId })
    const boardManager = new BoardManager({ client, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    return { boardState, boardController, boardManager }
  })

  useEffect(() => {
    const boardState = new BoardState({ id: boardId })
    const boardManager = new BoardManager({ client, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    setBoard({ boardState, boardController, boardManager })
  }, [boardId, client])

  return (
    <BoardContext.Provider
      value={{
        boardState: board.boardState,
        boardController: board.boardController,
        boardManager: board.boardManager
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
