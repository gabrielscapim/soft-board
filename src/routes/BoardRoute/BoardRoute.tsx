import { useState } from 'react'
import { BoardController, BoardState } from '../../lib'
import { BoardLayout } from './components'

export function BoardRoute () {
  const [boardState] = useState(new BoardState())
  const boardController = new BoardController(boardState)

  return (
    <BoardLayout
      boardState={boardState}
      boardController={boardController}
    />
  )
}
