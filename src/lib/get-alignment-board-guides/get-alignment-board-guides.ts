import { PRIMARY_GUIDE_DISTANCE_TO_SNAP, SECONDARY_GUIDE_DISTANCE_TO_SNAP } from '../../helpers'
import { FlexComponent, FlexComponentProperties } from '../../types'
import { Guide } from '../../types/board-positions'
import { UUID } from '../../types/common/uuid'
import { getComponentsLineGuidesStops, getDraggingSnappingEdges } from './_methods'

type GetAlignmentBoardGuidesParams = {
  flexComponents: FlexComponent[]
  selectedFlexComponents: UUID[]
  dragging: {
    id: UUID | null
    properties: FlexComponentProperties
  }
}

type GetAlignmentBoardGuidesResult = {
  horizontal: Guide[]
  vertical: Guide[]
}

export function getAlignmentBoardGuides (
  params: GetAlignmentBoardGuidesParams
): GetAlignmentBoardGuidesResult {
  const componentsLineGuides = getComponentsLineGuidesStops(params) // Guides of the components that are not being dragged
  const dragginSnappingEdges = getDraggingSnappingEdges(params) // Bounds of the component that is being dragged

  const dragging = params.dragging
  const vertical: Guide[] = []
  const horizontal: Guide[] = []

  for (const componentLineGuide of componentsLineGuides.vertical) {
    for (const draggingSnappingEdge of dragginSnappingEdges.vertical) {
      const diff = Math.abs(componentLineGuide.value - draggingSnappingEdge.guide)
      const hasGuide = vertical.find(
        guide => Math.abs(guide.lineGuide - componentLineGuide.value) <= 1 && guide.offset === draggingSnappingEdge.offset
      )

      const distance = componentLineGuide.distance === 'primary' && diff < PRIMARY_GUIDE_DISTANCE_TO_SNAP
        ? 'primary'
        : componentLineGuide.distance === 'secondary' && diff < SECONDARY_GUIDE_DISTANCE_TO_SNAP
          ? 'secondary'
          : null

      if (distance === 'secondary') {
        if (draggingSnappingEdge.snap === 'center') {
          continue
        }

        // Check if the dragging component is aligned with the left or right of the component to align
        const draggingX = dragging.properties.x
        const componentToAlignX = componentLineGuide.componentToAlign.properties.x
        const draggingLeft = Math.min(draggingX, draggingX + dragging.properties.width)
        const draggingRight = Math.max(draggingX, draggingX + dragging.properties.width)
        const componentToAlignRight = Math.max(componentToAlignX, componentToAlignX + componentLineGuide.componentToAlign.properties.width)
        const componentToAlignLeft = Math.min(componentToAlignX, componentToAlignX + componentLineGuide.componentToAlign.properties.width)

        if (draggingSnappingEdge.snap === 'start' && draggingLeft < componentToAlignLeft) {
          continue
        }

        if (draggingSnappingEdge.snap === 'end' && draggingRight > componentToAlignRight) {
          continue
        }
      }

      if (distance && !hasGuide) {
        vertical.push({
          componentToAlign: { id: componentLineGuide.componentToAlign.id },
          lineGuide: componentLineGuide.value,
          distance,
          offset: draggingSnappingEdge.offset,
          diff,
          snap: draggingSnappingEdge.snap
        })
      }
    }
  }

  for (const componentLineGuide of componentsLineGuides.horizontal) {
    for (const draggingSnappingEdge of dragginSnappingEdges.horizontal) {
      const diff = Math.abs(componentLineGuide.value - draggingSnappingEdge.guide)
      const hasGuide = vertical.find(
        guide => Math.abs(guide.lineGuide - componentLineGuide.value) <= 1 && guide.offset === draggingSnappingEdge.offset
      )

      const distance = componentLineGuide.distance === 'primary' && diff < PRIMARY_GUIDE_DISTANCE_TO_SNAP
        ? 'primary'
        : componentLineGuide.distance === 'secondary' && diff < SECONDARY_GUIDE_DISTANCE_TO_SNAP
          ? 'secondary'
          : null

      if (distance === 'secondary') {
        if (draggingSnappingEdge.snap === 'center') {
          continue
        }

        // Check if the dragging component is aligned with the top or bottom of the component to align
        const draggingY = dragging.properties.y
        const componentToAlignY = componentLineGuide.componentToAlign.properties.y
        const draggingTop = Math.min(draggingY, draggingY + dragging.properties.height)
        const draggingBottom = Math.max(draggingY, draggingY + dragging.properties.height)
        const componentToAlignBottom = Math.max(componentToAlignY, componentToAlignY + componentLineGuide.componentToAlign.properties.height)
        const componentToAlignTop = Math.min(componentToAlignY, componentToAlignY + componentLineGuide.componentToAlign.properties.height)

        if (draggingSnappingEdge.snap === 'start' && draggingTop < componentToAlignTop) {
          continue
        }

        if (draggingSnappingEdge.snap === 'end' && draggingBottom > componentToAlignBottom) {
          continue
        }
      }

      if (distance && !hasGuide) {
        horizontal.push({
          componentToAlign: { id: componentLineGuide.componentToAlign.id },
          lineGuide: componentLineGuide.value,
          distance,
          offset: draggingSnappingEdge.offset,
          diff,
          snap: draggingSnappingEdge.snap
        })
      }
    }
  }

  return { vertical, horizontal }
}
