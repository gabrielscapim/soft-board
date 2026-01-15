import { useMemo } from 'react'
import { useBoardStore } from '../hooks'
import { BoardState } from '../../../../lib'
import { SoftComponent, Offset } from '../../../../types'

export type ConnectionLinesProps = {
  boardState: BoardState
  boardTranslate: Offset
  scale: number
}

type SoftComponentWithConnection = SoftComponent & {
  connection: SoftComponent
}

export function ConnectionLines (props: ConnectionLinesProps) {
  const { boardState, boardTranslate, scale } = props

  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)

  const componentsWithConnection = useMemo(() => {
    return softComponents
      .map(component => {
        const connection = softComponents.find(
          softComponent => softComponent.id === component.connectionId
        )
        return connection ? { ...component, connection } : null
      })
      .filter((component): component is SoftComponentWithConnection => component !== null)
  }, [softComponents])

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="4"
          refX="0"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 6 2, 0 4" fill="rgba(30, 144, 255, 0.35)" />
        </marker>

        <marker
          id="startcircle"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <circle cx="3" cy="3" r="3" fill="rgba(30, 144, 255, 0.35)" />
        </marker>
      </defs>

      {componentsWithConnection.map(component => (
        <path
          key={`${component.id}-${component.connection.id}`}
          d={calculatePathCurve(component, boardTranslate, scale)}
          stroke="rgba(30, 144, 255, 0.35)"
          strokeWidth={1}
          strokeDasharray="5"
          fill="none"
          markerStart="url(#startcircle)"
          markerEnd="url(#arrowhead)"
        />
      ))}
    </svg>
  )
}

function getCenter (component: SoftComponent) {
  const { x, y, width, height } = component.properties

  return {
    cx: x + width / 2,
    cy: y + height / 2
  }
}

function transformCoords (coord: number, scale: number) {
  return coord * scale
}

function calculatePathCurve (
  component: SoftComponentWithConnection,
  boardTranslate: Offset,
  scale: number
) {
  const { cx: startCenterX, cy: startCenterY } = getCenter(component)
  const { cx: endCenterX, cy: endCenterY } = getCenter(component.connection)

  const startCenter = {
    x: transformCoords(startCenterX, scale) + boardTranslate.x,
    y: transformCoords(startCenterY, scale) + boardTranslate.y
  }
  const endCenter = {
    x: transformCoords(endCenterX, scale) + boardTranslate.x,
    y: transformCoords(endCenterY, scale) + boardTranslate.y
  }

  const startPoint = getBoundaryPoint(component, endCenter, boardTranslate, scale)
  const rawEndPoint = getBoundaryPoint(component.connection, startCenter, boardTranslate, scale)

  const vecX = rawEndPoint.x - endCenter.x
  const vecY = rawEndPoint.y - endCenter.y
  const vectorLength = Math.sqrt(vecX * vecX + vecY * vecY)
  const arrowExtra = 6
  const unitX = vecX / vectorLength
  const unitY = vecY / vectorLength
  const endPoint = {
    x: rawEndPoint.x + unitX * arrowExtra,
    y: rawEndPoint.y + unitY * arrowExtra
  }

  const midX = (startPoint.x + endPoint.x) / 2
  const midY = (startPoint.y + endPoint.y) / 2

  const dx = endPoint.x - startPoint.x
  const dy = endPoint.y - startPoint.y
  const lineLength = Math.sqrt(dx * dx + dy * dy)
  const perpX = lineLength ? -dy / lineLength : 0
  const perpY = lineLength ? dx / lineLength : 0

  const curvatureFactor = 35
  const controlX = midX + perpX * curvatureFactor
  const controlY = midY + perpY * curvatureFactor

  const d = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${endPoint.x} ${endPoint.y}`

  return d
}

function getBoundaryPoint (
  component: SoftComponent,
  target: Offset,
  boardTranslate: Offset,
  scale: number
) {
  const left = component.properties.x * scale + boardTranslate.x
  const top = component.properties.y * scale + boardTranslate.y
  const w = component.properties.width * scale
  const h = component.properties.height * scale
  const cx = left + w / 2
  const cy = top + h / 2

  const dx = target.x - cx
  const dy = target.y - cy

  if (dx === 0 && dy === 0) return { x: cx, y: cy }

  let factor: number
  if (dx === 0) {
    factor = (h / 2) / Math.abs(dy)
  } else if (dy === 0) {
    factor = (w / 2) / Math.abs(dx)
  } else {
    factor = Math.min((w / 2) / Math.abs(dx), (h / 2) / Math.abs(dy))
  }

  const boundaryX = cx + dx * factor
  const boundaryY = cy + dy * factor

  const len = Math.sqrt(dx * dx + dy * dy)
  const offset = 5
  const normX = dx / len
  const normY = dy / len

  return { x: boundaryX + normX * offset, y: boundaryY + normY * offset }
}
