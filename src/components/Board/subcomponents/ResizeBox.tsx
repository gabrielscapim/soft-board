import { useSelectedFlexComponent } from '../../../hooks'
import { BoardState } from '../../../lib'

export type ResizeBoxProps = {
  boardState: BoardState
}

export function ResizeBox (props: ResizeBoxProps) {
  const { boardState } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)

  if (!selectedFlexComponent) {
    return
  }

  const { properties: { x, y , width, height } } = selectedFlexComponent

  return (
    <g>
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
      {/* https://en.wikipedia.org/wiki/Wind_rose */}
      <ellipse cx={x + width / 2} cy={y} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-n" />
      <ellipse cx={x + width} cy={y} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-ne" />
      <ellipse cx={x + width} cy={y + height / 2} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-e" />
      <ellipse cx={x + width} cy={y + height} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-se" />
      <ellipse cx={x + width / 2} cy={y + height} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-s" />
      <ellipse cx={x} cy={y + height} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-sw" />
      <ellipse cx={x} cy={y + height / 2} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-w" />
      <ellipse cx={x} cy={y} rx="4" ry="4" fill="#0ea5e9" stroke="white" id="resize-nw" />
    </g>
  )
}
