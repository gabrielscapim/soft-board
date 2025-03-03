import { FlexComponent, FlexComponentProperties } from '../../types'
import { UUID } from '../../types/common/uuid'

type GetLineGuideStopsParams = {
  flexComponents: FlexComponent[]
  selectedFlexComponents: UUID[]
  dragging: {
    id: UUID | null
    properties: FlexComponentProperties
  }
}

type GetLineGuideStopsResult = {
  vertical: number[]
  horizontal: number[]
}

export function getLineGuideStops (
  params: GetLineGuideStopsParams
): GetLineGuideStopsResult {
  const vertical: number[] = []
  const horizontal: number[] = []

  for (const component of params.flexComponents) {
    if (component.id === params.dragging.id || params.selectedFlexComponents.includes(component.id)) {
      continue
    }

    const { x, y, width, height } = component.properties

    vertical.push(x, x + width, x + width / 2)
    horizontal.push(y, y + height, y + height / 2)
  }

  return {
    vertical,
    horizontal,
  }
}
