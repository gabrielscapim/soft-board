import { BoardController } from '../../lib'
import { BoardLayout } from './components'
import { useBoard } from '../../hooks'

export function BoardRoute () {
  const boardState = useBoard()
  const boardController = new BoardController(boardState ?? undefined)

  return (
    <>
      {boardState && (
        <BoardLayout
          boardState={boardState}
          boardController={boardController}
        />
      )}
    </>
  )
}
