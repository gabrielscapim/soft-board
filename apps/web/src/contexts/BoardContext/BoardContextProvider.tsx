import { PropsWithChildren, useEffect, useState } from 'react'
import { BoardController, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useParams } from 'react-router'

export type BoardContextProvider = PropsWithChildren

export function BoardContextProvider ({ children }: BoardContextProvider) {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId

  const [board, setBoard] = useState<{ state: BoardState, controller: BoardController }>(() => {
    const state = new BoardState({ id: boardId })
    const controller = new BoardController(state)

    return { state, controller }
  })

  useEffect(() => {
    const state = new BoardState({ id: boardId })
    const controller = new BoardController(state)

    setBoard({ state, controller })
  }, [boardId])

  return (
    <BoardContext.Provider value={{ boardState: board.state, boardController: board.controller }}>
      {children}
    </BoardContext.Provider>
  )
}
