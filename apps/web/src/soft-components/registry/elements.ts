import { SoftComponentProps } from '../types'
import { SoftComponentType } from '../../types'
import {
  ButtonSoftComponent,
  DividerSoftComponent,
  IconSoftComponent,
  InputSoftComponent,
  MobileScreenSoftComponent,
  RadioButtonSoftComponent,
  ShapeSoftComponent,
  TextSoftComponent,
  ToggleSoftComponent
} from '../components'

export const SOFT_COMPONENTS_ELEMENTS: Record<SoftComponentType, (props: SoftComponentProps) => JSX.Element> = {
  button: ButtonSoftComponent,
  divider: DividerSoftComponent,
  icon: IconSoftComponent,
  input: InputSoftComponent,
  mobileScreen: MobileScreenSoftComponent,
  radioButton: RadioButtonSoftComponent,
  shape: ShapeSoftComponent,
  text: TextSoftComponent,
  toggle: ToggleSoftComponent
}
