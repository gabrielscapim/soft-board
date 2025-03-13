import clsx from 'clsx'
import { FlexComponentProps } from '../flex-components'
import { ButtonFlexComponentProperties } from '../../types'

export function ButtonFlexComponent (props: FlexComponentProps) {
  const { component, handleAction } = props

  const properties = component.properties as ButtonFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'absolute',
        'draggable-group',
        'bg-gray-200',
        'border',
        'border-gray-500',
        'text-gray-800',
        'font-semibold',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
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
      onClick={() => handleAction?.(component, 'onClick')}
    >
      Button
    </div>
  )
}
