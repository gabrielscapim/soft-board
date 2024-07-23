import { useSelectedFlexComponent } from '../../../hooks'
import { BoardState } from '../../../lib'

export type ResizeBoxProps = {
  boardState: BoardState
}

type ResizerProps = {
  cx: number
  cy: number
  rx: number
  ry: number
  id: string
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

  const handleResizerClick = () => {

  }

  {/* https://en.wikipedia.org/wiki/Wind_rose */}
  const resizers: ResizerProps[] = [
    { cx: x + width / 2, cy: y, rx, ry, id: 'resize-n' },
    { cx: x + width, cy: y, rx, ry, id: 'resize-ne' },
    { cx: x + width, cy: y + height / 2, rx, ry, id: 'resize-e' },
    { cx: x + width, cy: y + height, rx, ry, id: 'resize-se' },
    { cx: x + width / 2, cy: y + height, rx, ry, id: 'resize-s' },
    { cx: x, cy: y + height, rx, ry, id: 'resize-sw' },
    { cx: x, cy: y + height / 2, rx, ry, id: 'resize-w'},
    { cx: x, cy: y, rx, ry, id: 'resize-nw' },
  ]

  return (
    <g className={resizerClass}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className={resizerClass}
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
          onClick={handleResizerClick}
          cx={resizer.cx}
          cy={resizer.cy}
          rx={resizer.rx}
          ry={resizer.ry}
          fill="#0ea5e9"
          stroke="white"
        />
      ))}
    </g>
  )
}
