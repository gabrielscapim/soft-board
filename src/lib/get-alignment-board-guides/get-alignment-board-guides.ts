import { FlexComponent, FlexComponentProperties } from '../../types'
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

type GetAlignmentBoardGuidesResultData = {
  lineGuide: number
  snap: string // start, center, end
  offset: number
  diff: number
}

type GetAlignmentBoardGuidesResult = {
  horizontal: GetAlignmentBoardGuidesResultData[]
  vertical: GetAlignmentBoardGuidesResultData[]
}

const DISTANCE_TO_SNAP = 10

export function getAlignmentBoardGuides (
  params: GetAlignmentBoardGuidesParams
): GetAlignmentBoardGuidesResult {
  const lineGuideStops = getLineGuideStops(params)
  const itemBounds = getObjectSnappingEdges(params)

  const vertical: GetAlignmentBoardGuidesResultData[] = []
  const horizontal: GetAlignmentBoardGuidesResultData[] = []

  for (const lineGuide of lineGuideStops.vertical) {
    for (const itemBound of itemBounds.vertical) {
      const diff = Math.abs(lineGuide - itemBound.guide)
      const hasGuide = vertical.find(
        guide => guide.lineGuide === lineGuide && guide.offset === itemBound.offset
      )

      if (diff < DISTANCE_TO_SNAP && !hasGuide) {
        vertical.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset })
      }
    }
  }

  for (const lineGuide of lineGuideStops.horizontal) {
    for (const itemBound of itemBounds.horizontal) {
      const diff = Math.abs(lineGuide - itemBound.guide)
      const hasGuide = horizontal.find(
        guide => guide.lineGuide === lineGuide && guide.offset === itemBound.offset
      )

      if (diff < DISTANCE_TO_SNAP && !hasGuide) {
        horizontal.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset })
      }
    }
  }

  return { vertical, horizontal }
}
