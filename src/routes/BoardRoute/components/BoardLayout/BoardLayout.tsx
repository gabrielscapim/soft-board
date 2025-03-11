import { Board } from '../../../../components/Board'
import { FlexComponentsMenu } from '../../../../components/FlexComponentsMenu'
import { NavBar } from '../../../../components/NavBar'
import { BoardController, BoardState } from '../../../../lib'
import { FlexComponentPropertiesMenu } from '../../../../components/FlexComponentPropertiesMenu'
import { GroupComponentsPropertiesMenu } from '../../../../components/GroupComponentsPropertiesMenu'

export type BoardLayoutProps = {
  boardState: BoardState
  boardController: BoardController
}

export function BoardLayout (props: BoardLayoutProps) {
  const { boardState, boardController } = props

  return (
    <div className="h-screen flex flex-col">
      <NavBar boardState={boardState} boardController={boardController} />
      <div className="flex grow">
        <FlexComponentsMenu boardController={boardController} />
        <FlexComponentPropertiesMenu boardState={boardState} boardController={boardController} />
        <GroupComponentsPropertiesMenu  boardState={boardState} boardController={boardController} />
        <Board boardState={boardState} boardController={boardController} />
      </div>
    </div>
  )
}
