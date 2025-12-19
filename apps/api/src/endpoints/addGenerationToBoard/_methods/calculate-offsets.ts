import { ComponentDatabase } from 'types/database'

type ComponentRow = Pick<
  ComponentDatabase,
  | 'id'
  | 'name'
  | 'type'
  | 'properties'
  | 'connectionId'
  | 'screenId'
>

type Rect = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const DEFAULT_GAP_X = 200
const DEFAULT_GAP_Y = 200

export function calculateOffsets (
  existing: ComponentRow[],
  generation: ComponentRow[]
) {
  if (existing.length === 0) {
    return { offsetX: 0, offsetY: 0 }
  }

  const existingBox = getBoundingBox(existing)
  const generationBox = getBoundingBox(generation)

  if (!existingBox || !generationBox) {
    return { offsetX: 0, offsetY: 0 }
  }

  const offsetRightX = existingBox.maxX - generationBox.minX + DEFAULT_GAP_X
  const offsetRightY = 0

  const offsetBottomX = 0
  const offsetBottomY = existingBox.maxY - generationBox.minY + DEFAULT_GAP_Y

  const existingWidth = existingBox.maxX - existingBox.minX
  const existingHeight = existingBox.maxY - existingBox.minY

  if (existingWidth >= existingHeight) {
    return {
      offsetX: offsetRightX,
      offsetY: offsetRightY
    }
  }

  return {
    offsetX: offsetBottomX,
    offsetY: offsetBottomY
  }
}

function getBoundingBox (components: ComponentRow[]): Rect | null {
  if (components.length === 0) return null

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const c of components) {
    const x = Number(c.properties?.x)
    const y = Number(c.properties?.y)
    const w = Number(c.properties?.width ?? 0)
    const h = Number(c.properties?.height ?? 0)

    if (Number.isNaN(x) || Number.isNaN(y)) continue

    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x + w)
    maxY = Math.max(maxY, y + h)
  }

  if (minX === Infinity) return null

  return { minX, minY, maxX, maxY }
}
