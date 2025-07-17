export type OnDraggingFlexComponentParams = {
  id: string
  properties: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  snap?: {
    type?: string
    distance?: 'primary' | 'secondary'
    x?: number
    y?: number
  }
  screenId?: string
}
