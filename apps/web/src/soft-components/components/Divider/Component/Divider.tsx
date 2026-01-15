import clsx from 'clsx'
import { DividerSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'

export function DividerSoftComponent (props: SoftComponentProps) {
  const { component, className } = props
  const properties = component.properties as DividerSoftComponentProperties

  const color = properties.color ?? 'primary'

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'bg-soft-component-gray-medium',
        color === 'secondary' && 'bg-soft-component-gray-light',
        color === 'tertiary' && 'bg-soft-component-black',
        className
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex
      }}
    />
  )
}
