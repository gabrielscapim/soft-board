export type OnResizingFlexComponentParams = {
  resizeDirection: string
  dimension: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  position: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  snap?: {
    type?: string
    distance?: 'primary' | 'secondary'
    position?: {
      x?: number
      y?: number
    }
    dimension?: {
      x?: number
      y?: number
    }
  }
}
