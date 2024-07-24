import { Board } from '../Board'
import { FlexComponentsMenu } from '../FlexComponentsMenu'
import { NavBar } from '../NavBar'
import { BoardController, BoardState } from '../../lib'

export type LayoutProps = {
  boardState: BoardState
  boardController: BoardController
}

export function Layout (props: LayoutProps) {
  const { boardState, boardController } = props

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow">
        <FlexComponentsMenu boardController={boardController} />
        <Board boardState={boardState} />
      </div>
    </div>
  )
}
