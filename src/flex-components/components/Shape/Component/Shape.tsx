import clsx from 'clsx'
import { ShapeFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function ShapeFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as ShapeFlexComponentProperties
  const color = properties.color ?? 'primary'
  const fill = properties.fill ?? true

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'border',
        'border-2',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'border-flex-component-gray-light',
        color === 'secondary' && 'border-flex-component-gray-medium',
        color === 'primary' && fill && 'bg-flex-component-gray-light',
        color === 'secondary' && fill && 'bg-flex-component-gray-medium'
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.borderRadius}px`,
        zIndex: properties.zIndex
      }}
    />
  )
}
