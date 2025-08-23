export type OnDraggingFlexComponentParams = {
  id: string
  screenId: string | null
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
}
