import { FlexComponentProps } from '../flex-components'

export function RectangleFlexComponent (props: FlexComponentProps) {
  const { component: { id, properties } } = props

  return (
    <g
      id={id}
      className="draggable-group"
      style={{ visibility: 'visible', cursor: 'move' }}
    >
      <rect
        x={properties.x}
        y={properties.y}
        width={properties.width}
        height={properties.height}
        rx={properties.rx}
        ry={properties.ry}
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
    </g>
  )
}
