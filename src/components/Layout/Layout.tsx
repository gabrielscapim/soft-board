import { Board } from '../Board'
import { FlexComponentsMenu } from '../FlexComponentsMenu'
import { NavBar } from '../NavBar'
import { BoardController, BoardState } from '../../lib'
import { FlexComponentPropertiesMenu } from '../FlexComponentPropertiesMenu'
import { GroupComponentsPropertiesMenu } from '../GroupComponentsPropertiesMenu'

export type LayoutProps = {
  boardState: BoardState
  boardController: BoardController
}

export function Layout (props: LayoutProps) {
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
