import { useSelectedFlexComponent } from '../../../hooks'
import { useGrid } from '../../../hooks/use-grid'
import { BoardState } from '../../../lib'

export type ResizeBoxProps = {
  boardState: BoardState
}

type ResizerConfig = {
  cx: number
  cy: number
  rx: number
  ry: number
  id: string
  cursor: string
}

const resizerClass = 'resizer'
const rx = 5
const ry = 5

export function ResizeBox (props: ResizeBoxProps) {
  const { boardState } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const minDistance = useGrid(boardState)

  if (!selectedFlexComponent) {
    return null
  }

  const { properties: { x, y , width, height } } = selectedFlexComponent

  const adjustedX = width < minDistance * 2 ? x - (minDistance - width / 2) : x
  const adjustedY = height < minDistance * 2 ? y - (minDistance - height / 2) : y
  const adjustedWidth = Math.max(width, minDistance * 2)
  const adjustedHeight = Math.max(height, minDistance * 2)

  const resizers: ResizerConfig[] = [
    { cx: adjustedX + adjustedWidth / 2, cy: adjustedY, rx, ry, id: 'n', cursor: 'n-resize' },
    { cx: adjustedX + adjustedWidth, cy: adjustedY, rx, ry, id: 'ne', cursor: 'ne-resize' },
    { cx: adjustedX + adjustedWidth, cy: adjustedY + adjustedHeight / 2, rx, ry, id: 'e', cursor: 'e-resize' },
    { cx: adjustedX + adjustedWidth, cy: adjustedY + adjustedHeight, rx, ry, id: 'se', cursor: 'se-resize' },
    { cx: adjustedX + adjustedWidth / 2, cy: adjustedY + adjustedHeight, rx, ry, id: 's', cursor: 's-resize' },
    { cx: adjustedX, cy: adjustedY + adjustedHeight, rx, ry, id: 'sw', cursor: 'sw-resize' },
    { cx: adjustedX, cy: adjustedY + adjustedHeight / 2, rx, ry, id: 'w', cursor: 'w-resize' },
    { cx: adjustedX, cy: adjustedY, rx, ry, id: 'nw', cursor: 'nw-resize' },
  ]

  return (
    <g className={resizerClass}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="#00a8ff"
        strokeDasharray="3 3"
        pointerEvents="none"
        strokeWidth="2"
      />
      {resizers.map(resizer => (
        <ellipse
          key={resizer.id}
          id={resizer.id}
          className={resizerClass}
          cx={resizer.cx}
          cy={resizer.cy}
          rx={resizer.rx}
          ry={resizer.ry}
          cursor={resizer.cursor}
          fill="#0ea5e9"
          stroke="white"
        />
      ))}
    </g>
  )
}
