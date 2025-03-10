import Cursor from '../../public/cursor.png'
import { RectangleFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'
import clsx from 'clsx'

export function RectangleFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as RectangleFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'absolute',
        'bg-white border',
        'border-black'
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.rx}px / ${properties.ry}px`,
        cursor: `url(${Cursor}) 0 0, auto`,
        zIndex: properties.zIndex
      }}
    >
    </div>
  )
}
