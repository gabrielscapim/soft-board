import clsx from 'clsx'
import { DividerFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'

export function DividerFlexComponent (props: FlexComponentProps) {
  const { component } = props
  const properties = component.properties as DividerFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'absolute',
        'draggable-group',
        'bg-gray-300'
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
