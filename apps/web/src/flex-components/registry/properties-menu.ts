import { FlexComponentType } from '@/types'
import {
  ButtonPropertiesMenu,
  DividerPropertiesMenu,
  IconPropertiesMenu,
  InputPropertiesMenu,
  RadioButtonPropertiesMenu,
  ShapePropertiesMenu,
  TextPropertiesMenu,
  TogglePropertiesMenu
} from '../components'
import { FlexComponentPropertiesMenuProps } from '../types'

export const FLEX_COMPONENTS_PROPERTIES_MENU: Partial<Record<FlexComponentType, (props: FlexComponentPropertiesMenuProps) => JSX.Element>> = {
  button: ButtonPropertiesMenu,
  divider: DividerPropertiesMenu,
  icon: IconPropertiesMenu,
  input: InputPropertiesMenu,
  radioButton: RadioButtonPropertiesMenu,
  shape: ShapePropertiesMenu,
  text: TextPropertiesMenu,
  toggle: TogglePropertiesMenu
}
