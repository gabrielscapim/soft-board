import { BoardController, BoardState } from '../../lib'
import { FlexComponent } from '../../types'

export type FlexComponentProps = {
  component: FlexComponent
  boardController?: BoardController
  handleAction?: (flexComponent: FlexComponent, event: string) => void
}

export type FlexComponentPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
  selected: FlexComponent
}
