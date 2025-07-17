import { Board } from '../../components'
import { useBoard } from '../../hooks'

export function EditBoardRoute () {
  const { boardState, boardController } = useBoard()

  return (
    <>
      <Board boardState={boardState} boardController={boardController} />
    </>
  )
}
