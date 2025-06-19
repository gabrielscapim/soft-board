import { BoardController } from '../../lib'
import { FlexComponent, FlexComponentProperties } from '../../types'

export type FlexComponentProps = {
  component: FlexComponent
  boardController?: BoardController
  handleAction?: (flexComponent: FlexComponent, event: string) => void
}

export type FlexComponentPropertiesMenuProps = {
  properties: FlexComponentProperties
  onUpdateProperties<T extends keyof FlexComponentProperties>(key: T, value: FlexComponentProperties[T]): void
}
