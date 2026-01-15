import { SoftComponent } from './flex-component'

export type SoftComponentProperties = SoftComponent['properties']

export type SoftComponentProperty =
  keyof ButtonSoftComponentProperties |
  keyof DividerSoftComponentProperties |
  keyof IconSoftComponentProperties |
  keyof InputSoftComponentProperties |
  keyof MobileScreenSoftComponentProperties |
  keyof RadioButtonSoftComponentProperties |
  keyof ShapeSoftComponentProperties |
  keyof TextSoftComponentProperties |
  keyof ToggleSoftComponentProperties

export type BaseProperty = keyof BaseProperties

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
export type ButtonSoftComponentProperties = BaseProperties & {
  color?: string // primary; secondary
  borderRadius?: number
  fontSize?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  label?: string
  icon?: string
}

/** Divider */
export type DividerSoftComponentProperties = BaseProperties & {
  color?: string // primary; secondary; tertiary
}

/** Icon */
export type IconSoftComponentProperties = BaseProperties & {
  color?: string // primary; secondary
  icon?: string
}

/** Input */
export type InputSoftComponentProperties = BaseProperties & {
  variant?: string // primary; secondary; tertiary
  borderRadius?: number
  fontSize?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  rightIcon?: string
  leftIcon?: string
  placeholder?: string
  textAlign?: string // left; center; right
}

/** Mobile screen */
export type MobileScreenSoftComponentProperties = BaseProperties & {
  main?: boolean
}

/** Radio button */
export type RadioButtonSoftComponentProperties = BaseProperties & {
  activated?: boolean
}

/** Shape */
export type ShapeSoftComponentProperties = BaseProperties & {
  color?: string // primary; secondary
  fill?: boolean
  borderRadius?: number
  borderWidth?: number
}

/** Text */
export type TextSoftComponentProperties = BaseProperties & {
  color?: string // primary; secondary
  text?: string
  fontSize?: number
  decoration?: string // none; underline; line-through; overline
  fontWeight?: number
  lineHeight?: number
  align?: string // left; center; right; justify
}

/** Toggle */
export type ToggleSoftComponentProperties = BaseProperties & {
  activated?: boolean
}
