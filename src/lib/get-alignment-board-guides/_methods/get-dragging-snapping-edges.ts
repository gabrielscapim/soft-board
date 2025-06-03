import { FlexComponentProperties } from '../../../types'
import { UUID } from '../../../types/common/uuid'

type GetDraggingSnappingEdgesParams = {
  dragging: {
    id: UUID | null
    properties: FlexComponentProperties
  }
}

type GetDraggingSnappingEdgesResult = {
  vertical: {
    guide: number
    offset: number
    snap: 'start' | 'center' | 'end'
  }[]
  horizontal: {
    guide: number
    offset: number
    snap: 'start' | 'center' | 'end'
  }[]
}

/**
 * Generates snapping edges for a component being dragged on the board.
 * @param params Parameters containing the properties of the component being dragged.
 * @returns An object containing vertical and horizontal snapping edges for the dragging component.
 */
export function getDraggingSnappingEdges (
  params: GetDraggingSnappingEdgesParams
): GetDraggingSnappingEdgesResult {
  const { x, y, width, height } = params.dragging.properties

  return {
    vertical: [
      { guide: Math.round(x), offset: Math.round(0), snap: 'start' },
      { guide: Math.round(x + width / 2), offset: Math.round(-width / 2), snap: 'center' },
      { guide: Math.round(x + width), offset: Math.round(-width), snap: 'end' }
    ],
    horizontal: [
      { guide: Math.round(y), offset: Math.round(0), snap: 'start' },
      { guide: Math.round(y + height / 2), offset: Math.round(-height / 2), snap: 'center' },
      { guide: Math.round(y + height), offset: Math.round(-height), snap: 'end' }
    ]
  }
}
