import { BoardController } from '../../lib'
import { FlexComponent } from '../../types'

export type FlexComponentProps = {
  component: FlexComponent
  boardController?: BoardController
  handleAction?: (flexComponent: FlexComponent, event: string) => void
}
