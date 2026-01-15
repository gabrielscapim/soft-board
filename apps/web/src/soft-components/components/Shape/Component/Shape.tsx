import clsx from 'clsx'
import { ShapeSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'

export function ShapeSoftComponent (props: SoftComponentProps) {
  const { component, className } = props

  const properties = component.properties as ShapeSoftComponentProperties
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
        color === 'secondary' && fill && 'bg-flex-component-gray-medium',
        className
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.borderRadius}px`,
        borderWidth: `${properties.borderWidth}px`,
        zIndex: properties.zIndex
      }}
    />
  )
}
