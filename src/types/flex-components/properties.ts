/** Base properties */
export type BaseProperties = {
  x: number
	y: number
	width: number
	height: number
}

/** Button properties */
export type ButtonFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}

/** Divider properties */
export type DividerFlexComponentProperties = BaseProperties

/** Input propertires */
export type InputFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}

// MobileScreen properties
export type MobileScreenFlexComponentProperties = BaseProperties

/** Rectangle properties */
export type RectangleFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}

/** Select properties */
export type SelectFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}
