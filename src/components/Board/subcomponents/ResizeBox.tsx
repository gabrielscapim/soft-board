import { useSelectedFlexComponent } from '../../../hooks'
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

  if (!selectedFlexComponent) {
    return
  }

  const { properties: { x, y , width, height } } = selectedFlexComponent

  {/* https://en.wikipedia.org/wiki/Wind_rose */}
  const resizers: ResizerConfig[] = [
    { cx: x + width / 2, cy: y, rx, ry, id: 'n', cursor: 'n-resize' },
    { cx: x + width, cy: y, rx, ry, id: 'ne', cursor: 'ne-resize' },
    { cx: x + width, cy: y + height / 2, rx, ry, id: 'e', cursor: 'e-resize' },
    { cx: x + width, cy: y + height, rx, ry, id: 'se', cursor: 'se-resize' },
    { cx: x + width / 2, cy: y + height, rx, ry, id: 's', cursor: 's-resize' },
    { cx: x, cy: y + height, rx, ry, id: 'sw', cursor: 'sw-resize' },
    { cx: x, cy: y + height / 2, rx, ry, id: 'w', cursor: 'w-resize' },
    { cx: x, cy: y, rx, ry, id: 'nw', cursor: 'nw-resize' },
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
