import clsx from 'clsx'
import { FlexComponentProps } from '../flex-components'
import { ButtonFlexComponentProperties } from '../../types'

export function ButtonFlexComponent (props: FlexComponentProps) {
  const { component } = props

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
        'select-none'
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.rx}px / ${properties.ry}px`,
      }}
    >
      Button
    </div>
  )
}
