import { FlexComponentProps } from '../types'
import { FlexComponentType } from '../../types'
import {
  ButtonFlexComponent,
  DividerFlexComponent,
  IconFlexComponent,
  InputFlexComponent,
  MobileScreenFlexComponent,
  RadioButtonFlexComponent,
  ShapeFlexComponent,
  TextFlexComponent,
  ToggleFlexComponent
} from '../components'

export const FLEX_COMPONENTS_ELEMENTS: Record<FlexComponentType, (props: FlexComponentProps) => JSX.Element> = {
  button: ButtonFlexComponent,
  divider: DividerFlexComponent,
  icon: IconFlexComponent,
  input: InputFlexComponent,
  mobileScreen: MobileScreenFlexComponent,
  radioButton: RadioButtonFlexComponent,
  shape: ShapeFlexComponent,
  text: TextFlexComponent,
  toggle: ToggleFlexComponent
}
