import { FlexComponentType } from '../types'
import { RectangleFlexComponentIcon } from './icons'

export type FlexComponentIconElement = () => JSX.Element

export const FLEX_COMPONENT_ICONS: Record<FlexComponentType, FlexComponentIconElement> = {
  rectangle: RectangleFlexComponentIcon,
}
