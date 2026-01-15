import { SECONDARY_GUIDE_DISTANCE_TO_SNAP } from '../../../../helpers'
import { useBoardStore } from '../hooks'
import { BoardState } from '../../../../lib'
import { FlexComponent, Offset } from '../../../../types'

export type AlignmentGuidesProps = {
  boardState: BoardState
  boardTranslate: Offset
  scale: number
}

export function AlignmentGuides (props: AlignmentGuidesProps) {
  const { boardState, boardTranslate, scale } = props
  const guides = useBoardStore(boardState, 'guidesChanged', state => state.guides)
  const isDragging = useBoardStore(boardState, 'isDraggingChanged', state => state.isDragging)
  const isResizing = useBoardStore(boardState, 'isResizingChanged', state => state.isResizing)
  const selectedComponents = useBoardStore(boardState, 'selectedFlexComponentsChanged', state => state.selectedFlexComponents)
  const flexComponents = useBoardStore(boardState, 'flexComponentsChanged', state => state.flexComponents)

  if (
    (!isDragging && !isResizing) ||
    !selectedComponents ||
    !flexComponents ||
    selectedComponents.length === 0 ||
    flexComponents.length === 0
  ) {
    return null
  }

  const transform = (value: number) => value * scale

  const groupDimensionsBoard = getGroupDimensions(
    flexComponents.filter(fc => selectedComponents.includes(fc.id))
  )

  const groupDimensions = {
    x: transform(groupDimensionsBoard.x) + boardTranslate.x,
    y: transform(groupDimensionsBoard.y) + boardTranslate.y,
    width: groupDimensionsBoard.width * scale,
    height: groupDimensionsBoard.height * scale
  }

  const primaryVerticalGuides = guides.vertical.filter(guide => guide.distance === 'primary')
  const primaryHorizontalGuides = guides.horizontal.filter(guide => guide.distance === 'primary')
  const secondaryVerticalGuides = guides.vertical.filter(guide => guide.distance === 'secondary')
  const secondaryHorizontalGuides = guides.horizontal.filter(guide => guide.distance === 'secondary')

  const flexComponentsById = new Map(flexComponents.map(flexComponent => [flexComponent.id, flexComponent]))

  return (
    <svg
      id="alignment-guides"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      {primaryHorizontalGuides.map((guide, index) => {
        const yPos = transform(guide.lineGuide) + boardTranslate.y

        return (
          <line
            key={`primary-horizontal-${index}`}
            x1={-5000}
            y1={yPos}
            x2={5000}
            y2={yPos}
            stroke="rgba(30,144,255,0.8)"
            strokeWidth={1}
          />
        )
      })}

      {primaryVerticalGuides.map((guide, index) => {
        const xPos = transform(guide.lineGuide) + boardTranslate.x
        return (
          <line
            key={`primary-vertical-${index}`}
            x1={xPos}
            y1={-5000}
            x2={xPos}
            y2={5000}
            stroke="rgba(30,144,255,0.8)"
            strokeWidth={1}
          />
        )
      })}

      {secondaryHorizontalGuides.map((guide, index) => {
        const yPos = transform(guide.lineGuide) + boardTranslate.y
        const alignedComponent = flexComponentsById.get(guide.componentToAlign.id)

        if (!alignedComponent) {
          return null
        }

        const groupStart = groupDimensions.y
        const groupEnd = groupDimensions.y + groupDimensions.height
        const groupCenter = groupDimensions.y + groupDimensions.height / 2
        const alignedComponentStart = transform(alignedComponent.properties.y) + boardTranslate.y
        const alignedComponentEnd = transform(alignedComponent.properties.y + alignedComponent.properties.height) + boardTranslate.y

        let rectY = yPos

        if (guide.snap === 'end') {
          if (alignedComponentStart > groupEnd) {
            rectY = yPos
          } else if (Math.abs(groupEnd + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) - alignedComponentEnd) <= 5) {
            rectY = yPos
          } else {
            rectY = yPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          }
        } else if (guide.snap === 'start') {
          if (alignedComponentEnd < groupStart) {
            rectY = yPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          } else if (Math.abs(groupStart - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) - alignedComponentStart) <= 5) {
            rectY = yPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          }
        } else {
          if (groupCenter > alignedComponentStart && groupCenter + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) !== alignedComponentEnd) {
            rectY = yPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          } else if (groupCenter > alignedComponentStart && groupCenter + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) === alignedComponentEnd) {
            rectY = yPos
          }
        }

        return (
          <rect
            key={`secondary-horizontal-${index}`}
            x={-5000}
            y={rectY}  // 10px acima e 10px abaixo => altura 20px
            width={10000}
            height={transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)}
            fill="rgba(173,216,230,0.3)"
            stroke="rgba(30,144,255,0.8)"
            strokeWidth={1}
            strokeDasharray="4"
          />
        )
      })}

      {secondaryVerticalGuides.map((guide, index) => {
        const xPos = transform(guide.lineGuide) + boardTranslate.x
        const alignedComponent = flexComponentsById.get(guide.componentToAlign.id)

        if (!alignedComponent) {
          return null
        }

        const groupStart = groupDimensions.x
        const groupEnd = groupDimensions.x + groupDimensions.width
        const groupCenter = groupDimensions.x + groupDimensions.width / 2
        const alignedComponentStart = transform(alignedComponent.properties.x) + boardTranslate.x
        const alignedComponentEnd = transform(alignedComponent.properties.x + alignedComponent.properties.width) + boardTranslate.x

        let rectX = xPos

        if (guide.snap === 'end') {
          if (alignedComponentStart > groupEnd) {
            rectX = xPos
          } else if (Math.abs(groupEnd + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) - alignedComponentEnd) <= 5) {
            rectX = xPos
          } else {
            rectX = xPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          }
        } else if (guide.snap === 'start') {
          if (alignedComponentEnd < groupStart) {
            rectX = xPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          } else if (Math.abs(groupStart - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) - alignedComponentStart) <= 5) {
            rectX = xPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          }
        } else {
          if (groupCenter > alignedComponentStart && groupCenter + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) !== alignedComponentEnd) {
            rectX = xPos - transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)
          } else if (groupCenter > alignedComponentStart && groupCenter + transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP) === alignedComponentEnd) {
            rectX = xPos
          }
        }

        return (
          <rect
            key={`secondary-vertical-${index}`}
            x={rectX}
            y={-5000}
            width={transform(SECONDARY_GUIDE_DISTANCE_TO_SNAP)}
            height={10000}
            fill="rgba(173,216,230,0.3)"
            stroke="rgba(30,144,255,0.8)"
            strokeWidth={1}
            strokeDasharray="4"
          />
        )
      })}
    </svg>
  )
}

function getGroupDimensions (
  selectedComponents: FlexComponent[]
) {
  if (selectedComponents.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 }
  }

  let groupMinX = selectedComponents[0].properties.x
  let groupMinY = selectedComponents[0].properties.y
  let groupMaxX = selectedComponents[0].properties.x + selectedComponents[0].properties.width
  let groupMaxY = selectedComponents[0].properties.y + selectedComponents[0].properties.height

  selectedComponents.forEach(component => {
    const { x, y, width, height } = component.properties

    if (x < groupMinX) groupMinX = x
    if (y < groupMinY) groupMinY = y
    if (x + width > groupMaxX) groupMaxX = x + width
    if (y + height > groupMaxY) groupMaxY = y + height
  })

  return {
    x: groupMinX,
    y: groupMinY,
    width: groupMaxX - groupMinX,
    height: groupMaxY - groupMinY
  }
}
