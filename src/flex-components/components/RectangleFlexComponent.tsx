import { FlexComponentProps } from '../flex-components'
import type { RectangleFlexComponentType } from '../../types'

export function RectangleFlexComponent (props: FlexComponentProps) {
  const properties = props.component.properties as RectangleFlexComponentType['properties']

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
      />
    </g>
  )
}
