import { ClassValue } from 'clsx'
import { BoardController } from '../../lib'
import { FlexComponent, FlexComponentProperties } from '../../types'

export type FlexComponentProps = {
  component: FlexComponent
  boardController?: BoardController
  editable?: boolean
  className?: ClassValue
  handleAction?: (flexComponent: FlexComponent, event: string) => void
}

export type FlexComponentPropertiesMenuProps = {
  properties: FlexComponentProperties
  onUpdateProperties (key: string, value: unknown): void
}
