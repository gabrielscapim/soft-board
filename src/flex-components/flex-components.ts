import { FlexComponent, FlexComponentType } from '../types'
import { RectangleFlexComponent } from './components'

export type FlexComponentProps = {
  component: FlexComponent
}

export type FlexComponentElement = (props: FlexComponentProps) => JSX.Element

export const FLEX_COMPONENTS: Record<FlexComponentType, FlexComponentElement> = {
  rectangle: RectangleFlexComponent,
}
