import { FlexComponentProps } from '../flex-components'

export function RectangleFlexComponent (props: FlexComponentProps) {
  const { component: { properties } } = props

  return (
    <g
      transform="translate(0.5,0.5)"
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
        strokeWidth="1.5"
      />
    </g>
  )
}
