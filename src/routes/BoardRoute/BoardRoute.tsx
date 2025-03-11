import {
  FlexComponentsMenu,
  FlexComponentPropertiesMenu,
  GroupComponentsPropertiesMenu,
  Board
} from '../../components'
import { useBoard } from '../../hooks'

export function BoardRoute () {
  const { boardState,  boardController } = useBoard()

  return (
    <>
      <FlexComponentsMenu boardController={boardController} />
      <FlexComponentPropertiesMenu boardState={boardState} boardController={boardController} />
      <GroupComponentsPropertiesMenu  boardState={boardState} boardController={boardController} />
      <Board boardState={boardState} boardController={boardController} />
    </>
  )
}
