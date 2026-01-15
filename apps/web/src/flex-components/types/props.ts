import { ClassValue } from 'clsx'
import { BoardController, BoardState } from '../../lib'
import { SoftComponent, SoftComponentProperties } from '../../types'

export type SoftComponentProps = {
  component: SoftComponent
  boardController?: BoardController
  editable?: boolean
  className?: ClassValue
  isDragging?: boolean
  isResizing?: boolean
  handleAction?: (softComponent: SoftComponent, event: string) => void
}

export type SoftComponentPropertiesMenuProps = {
  boardState: BoardState
  component: SoftComponent
  properties: SoftComponentProperties
  onUpdateProperties (key: string, value: unknown): void
}
