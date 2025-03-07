import { SECONDARY_GUIDE_DISTANCE_TO_SNAP } from '../../helpers'
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

type LineGuide = {
  flexComponentToAlign: {
    id: UUID
  }
  value: number,
  distance: 'primary' | 'secondary'
}

type GetLineGuideStopsResult = {
  vertical: LineGuide[]
  horizontal: LineGuide[]
}

export function getLineGuideStops (
  params: GetLineGuideStopsParams
): GetLineGuideStopsResult {
  const vertical: LineGuide[] = []
  const horizontal: LineGuide[] = []

  for (const component of params.flexComponents) {
    if (component.id === params.dragging.id || params.selectedFlexComponents.includes(component.id)) {
      continue
    }

    const { x, y, width, height } = component.properties

    const left = Math.min(x, x + width)
    const right = Math.max(x, x + width)
    const vCenter = (left + right) / 2

    const top = Math.min(y, y + height)
    const bottom = Math.max(y, y + height)
    const hCenter = (top + bottom) / 2

    vertical.push(
      { flexComponentToAlign: { id: component.id }, value: left, distance: 'primary' },
      { flexComponentToAlign: { id: component.id }, value: right, distance: 'primary' },
      { flexComponentToAlign: { id: component.id }, value: vCenter, distance: 'primary' },
    )

    horizontal.push(
      { flexComponentToAlign: { id: component.id }, value: top, distance: 'primary' },
      { flexComponentToAlign: { id: component.id }, value: bottom, distance: 'primary' },
      { flexComponentToAlign: { id: component.id }, value: hCenter, distance: 'primary' },
    )

    vertical.push(
      { flexComponentToAlign: { id: component.id }, value: left - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: left + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: right - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: right + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' }
    )

    horizontal.push(
      { flexComponentToAlign: { id: component.id }, value: top - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: top + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: bottom - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { flexComponentToAlign: { id: component.id }, value: bottom + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' }
    )
  }

  return {
    vertical,
    horizontal,
  }
}
