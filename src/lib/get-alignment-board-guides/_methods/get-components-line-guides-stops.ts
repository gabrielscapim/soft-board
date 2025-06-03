import { SECONDARY_GUIDE_DISTANCE_TO_SNAP } from '../../../helpers'
import { FlexComponent, UUID, FlexComponentProperties } from '../../../types'

type GetComponentsLineGuidesStopsParams = {
  flexComponents: FlexComponent[]
  selectedFlexComponents: UUID[]
  dragging: {
    id: UUID | null
    properties: FlexComponentProperties
  }
}

type LineGuide = {
  componentToAlign: FlexComponent
  value: number,
  distance: 'primary' | 'secondary'
}

type GetComponentsLineGuidesStopsResult = {
  vertical: LineGuide[]
  horizontal: LineGuide[]
}

export function getComponentsLineGuidesStops (
  params: GetComponentsLineGuidesStopsParams
): GetComponentsLineGuidesStopsResult {
  const vertical: LineGuide[] = []
  const horizontal: LineGuide[] = []

  for (const component of params.flexComponents) {
    const isDragging = params.dragging.id === component.id || params.selectedFlexComponents.includes(component.id)

    if (isDragging) {
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
      { componentToAlign: component, value: left, distance: 'primary' },
      { componentToAlign: component, value: right, distance: 'primary' },
      { componentToAlign: component, value: vCenter, distance: 'primary' },
      { componentToAlign: component, value: left - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { componentToAlign: component, value: right + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' }
    )

    horizontal.push(
      { componentToAlign: component, value: top, distance: 'primary' },
      { componentToAlign: component, value: bottom, distance: 'primary' },
      { componentToAlign: component, value: hCenter, distance: 'primary' },
      { componentToAlign: component, value: top - SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' },
      { componentToAlign: component, value: bottom + SECONDARY_GUIDE_DISTANCE_TO_SNAP, distance: 'secondary' }
    )
  }

  return {
    vertical,
    horizontal
  }
}
