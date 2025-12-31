import { FlexComponentType } from '@/types'
import {
  ButtonPropertiesMenu,
  DividerPropertiesMenu,
  IconPropertiesMenu,
  InputPropertiesMenu,
  MobileScreenPropertiesMenu,
  RadioButtonPropertiesMenu,
  ShapePropertiesMenu,
  TextPropertiesMenu,
  TogglePropertiesMenu
} from '../components'
import { FlexComponentPropertiesMenuProps } from '../types'

export const FLEX_COMPONENTS_PROPERTIES_MENU: Record<FlexComponentType, (props: FlexComponentPropertiesMenuProps) => JSX.Element> = {
  button: ButtonPropertiesMenu,
  divider: DividerPropertiesMenu,
  icon: IconPropertiesMenu,
  input: InputPropertiesMenu,
  mobileScreen: MobileScreenPropertiesMenu,
  radioButton: RadioButtonPropertiesMenu,
  shape: ShapePropertiesMenu,
  text: TextPropertiesMenu,
  toggle: TogglePropertiesMenu
}
