import { SoftComponentType } from '@/types'
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
import { SoftComponentPropertiesMenuProps } from '../types'

export const SOFT_COMPONENTS_PROPERTIES_MENU: Record<SoftComponentType, (props: SoftComponentPropertiesMenuProps) => JSX.Element> = {
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
