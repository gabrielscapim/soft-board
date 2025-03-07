import { PRIMARY_GUIDE_DISTANCE_TO_SNAP, SECONDARY_GUIDE_DISTANCE_TO_SNAP } from '../../helpers'
import { FlexComponent, FlexComponentProperties } from '../../types'
import { Guide } from '../../types/board-positions'
import { UUID } from '../../types/common/uuid'
import { getLineGuideStops } from './_get-line-guides-stops'
import { getObjectSnappingEdges } from './_get-object-snapping-edges'

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
  const lineGuideStops = getLineGuideStops(params) // Guides of the components that are not being dragged
  const itemBounds = getObjectSnappingEdges(params) // Bounds of the component that is being dragged

  const vertical: Guide[] = []
  const horizontal: Guide[] = []

  for (const lineGuide of lineGuideStops.vertical) {
    for (const itemBound of itemBounds.vertical) {
      const diff = Math.abs(lineGuide.value - itemBound.guide)
      const hasGuide = vertical.find(
        guide => guide.lineGuide === lineGuide.value && guide.offset === itemBound.offset
      )

      const distance =
        lineGuide.distance === 'primary' && diff < PRIMARY_GUIDE_DISTANCE_TO_SNAP
          ? 'primary'
          : lineGuide.distance === 'secondary' && diff < SECONDARY_GUIDE_DISTANCE_TO_SNAP
          ? 'secondary'
          : null

      if (distance && !hasGuide) {
        vertical.push({
          flexComponentToAlign: { id: lineGuide.flexComponentToAlign.id },
          lineGuide: lineGuide.value,
          distance,
          offset: itemBound.offset,
          diff,
          snap: itemBound.snap
        })
      }
    }
  }

  for (const lineGuide of lineGuideStops.horizontal) {
    for (const itemBound of itemBounds.horizontal) {
      const diff = Math.abs(lineGuide.value - itemBound.guide)
      const hasGuide = horizontal.find(
        guide => guide.lineGuide === lineGuide.value && guide.offset === itemBound.offset
      )

      const distance =
        lineGuide.distance === 'primary' && diff < PRIMARY_GUIDE_DISTANCE_TO_SNAP
          ? 'primary'
          : lineGuide.distance === 'secondary' && diff < SECONDARY_GUIDE_DISTANCE_TO_SNAP
          ? 'secondary'
          : null

      if (distance && !hasGuide) {
        horizontal.push({
          flexComponentToAlign: { id: lineGuide.flexComponentToAlign.id },
          lineGuide: lineGuide.value,
          distance,
          offset: itemBound.offset,
          diff,
          snap: itemBound.snap
        })
      }
    }
  }

  return { vertical, horizontal }
}
