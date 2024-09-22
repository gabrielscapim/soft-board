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

/** Input propertires */
export type InputFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}

/** Rectangle properties */
export type RectangleFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}
