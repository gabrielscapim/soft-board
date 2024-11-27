import { FlexComponent } from '../../types'

type GetObjectSnappingEdgesParams = {
  selectedFlexComponent: FlexComponent
}

type GetObjectSnappingEdgesResult = {
  vertical: {
    guide: number
    offset: number
    snap: string
  }[]
  horizontal: {
    guide: number
    offset: number
    snap: string
  }[]
}

export function getObjectSnappingEdges (params: GetObjectSnappingEdgesParams): GetObjectSnappingEdgesResult {
  const { x, y, width, height } = params.selectedFlexComponent.properties

  return {
    vertical: [
      { guide: Math.round(x), offset: Math.round(0), snap: 'start' },
      { guide: Math.round(x + width / 2), offset: Math.round(-width / 2), snap: 'center' },
      { guide: Math.round(x + width), offset: Math.round(-width), snap: 'end' },
    ],
    horizontal: [
      { guide: Math.round(y), offset: Math.round(0), snap: 'start' },
      { guide: Math.round(y + height / 2), offset: Math.round(-height / 2), snap: 'center' },
      { guide: Math.round(y + height), offset: Math.round(-height), snap: 'end' },
    ],
  }
}
