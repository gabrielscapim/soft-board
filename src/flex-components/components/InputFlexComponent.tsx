import clsx from 'clsx'
import { FlexComponentProps } from '../flex-components'
import { InputFlexComponentProperties } from '../../types'

export function InputFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as InputFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'absolute',
        'draggable-group',
        'bg-gray-50',
        'border',
        'border-gray-500',
        'text-gray-400',
        'font-medium',
        'px-4',
        'flex',
        'items-center',
        'select-none',
        'text-ellipsis',
        'overflow-hidden'
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.rx}px / ${properties.ry}px`,
        zIndex: properties.zIndex
      }}
    >
      Input
    </div>
  )
}
