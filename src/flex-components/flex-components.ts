import { FlexComponent, FlexComponentType } from '../types'
import { ButtonFlexComponent, DividerFlexComponent, InputFlexComponent, RectangleFlexComponent } from './components'
import { SelectFlexComponent } from './components/SelectFlexComponent'

export type FlexComponentProps = {
  component: FlexComponent
}

export type FlexComponentElement = (props: FlexComponentProps) => JSX.Element

export const FLEX_COMPONENTS: Record<FlexComponentType, FlexComponentElement> = {
  button: ButtonFlexComponent,
  divider: DividerFlexComponent,
  input: InputFlexComponent,
  rectangle: RectangleFlexComponent,
  select: SelectFlexComponent
}
