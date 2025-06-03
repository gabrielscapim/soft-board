import { FlexComponent } from './flex-component'

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty =
  keyof ButtonFlexComponentProperties |
  keyof DividerFlexComponentProperties |
  keyof IconFlexComponentProperties |
  keyof InputFlexComponentProperties |
  keyof MobileScreenFlexComponentProperties |
  keyof RadioButtonFlexComponentProperties |
  keyof ShapeFlexComponentProperties |
  keyof TextFlexComponentProperties |
  keyof ToggleFlexComponentProperties

/** Base */
export type BaseProperties = {
  x: number
	y: number
	width: number
	height: number
  zIndex?: number
  absolute?: boolean
}

/** Button */
export type ButtonFlexComponentProperties = BaseProperties & {
  color?: 'primary' | 'secondary'
  borderRadius?: number
  fontSize?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
}

/** Divider */
export type DividerFlexComponentProperties = BaseProperties & {
  icon?: string
  color?: 'primary' | 'secondary' | 'tertiary'
  style?: 'solid' | 'dashed' | 'dotted'
}

/** Icon */
export type IconFlexComponentProperties = BaseProperties & {
  color?: 'primary' | 'secondary'
  icon?: string
}

/** Input */
export type InputFlexComponentProperties = BaseProperties & {
  variant?: 'primary' | 'secondary' | 'tertiary'
  borderRadius?: number
  fontSize?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  rightIcon?: string
  leftIcon?: string
  placeholder?: string
  textAlign?: 'left' | 'center' | 'right'
}

/** Mobile screen */
export type MobileScreenFlexComponentProperties = BaseProperties

/** Radio button */
export type RadioButtonFlexComponentProperties = BaseProperties & {
  activated?: boolean
}

/** Shape */
export type ShapeFlexComponentProperties = BaseProperties & {
  color?: 'primary' | 'secondary' | 'tertiary'
  fill?: boolean
  borderRadius?: number
  borderWidth?: number
}

/** Text */
export type TextFlexComponentProperties = BaseProperties & {
  color?: 'primary' | 'secondary'
  text?: string
  fontSize?: number
  italic?: boolean
  fontWeight?: number
  lineHeight?: number
  align?: 'left' | 'center' | 'right' | 'justify'
}

/** Toggle */
export type ToggleFlexComponentProperties = BaseProperties & {
  activated?: boolean
}
