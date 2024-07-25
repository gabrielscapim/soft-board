/** Base properties */
export type BaseProperties = {
  x: number
	y: number
	width: number
	height: number
}

/** Rectangle properties */
export type RectangleFlexComponentProperties = BaseProperties & {
  rx?: number
  ry?: number
}
