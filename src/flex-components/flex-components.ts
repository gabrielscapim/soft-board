import { FlexComponentType } from '../types'
import { RectangleFlexComponent } from './components'

export type FlexComponentProps = {
  component: FlexComponentType
}

export type FlexComponent = (props: FlexComponentProps) => JSX.Element

export const FLEX_COMPONENTS: Record<FlexComponentType['type'], FlexComponent> = {
  rectangle: RectangleFlexComponent,
}
