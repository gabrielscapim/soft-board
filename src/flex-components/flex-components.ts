import { BoardController } from '../lib'
import { FlexComponent, FlexComponentType } from '../types'
import {
  ButtonFlexComponent,
  DividerFlexComponent,
  InputFlexComponent,
  MobileScreenFlexComponent,
  RectangleFlexComponent,
  SelectFlexComponent,
  TextFlexComponent
} from './components'

export type FlexComponentProps = {
  component: FlexComponent
  boardController?: BoardController
  handleAction?: (flexComponent: FlexComponent, event: string) => void
}

export type FlexComponentElement = (props: FlexComponentProps) => JSX.Element

export const FLEX_COMPONENTS: Record<FlexComponentType, FlexComponentElement> = {
  button: ButtonFlexComponent,
  divider: DividerFlexComponent,
  input: InputFlexComponent,
  mobileScreen: MobileScreenFlexComponent,
  rectangle: RectangleFlexComponent,
  select: SelectFlexComponent,
  text: TextFlexComponent
}
