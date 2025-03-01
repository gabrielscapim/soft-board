import clsx from 'clsx'
import { SelectFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const MIN_WIDTH = 32

export function SelectFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as SelectFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'absolute',
        'draggable-group',
        'flex',
        'items-center',
        'border',
        'border-gray-500',
        'bg-white',
        'rounded-sm',
        'overflow-hidden',
        'select-none'
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width > MIN_WIDTH ? properties.width : MIN_WIDTH}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.rx}px / ${properties.ry}px`
      }}
    >
      <div className="text-ellipsis overflow-hidden w-full pl-4">
        Select
      </div>
      <div className="bg-gray-100 flex items-center justify-center border-l border-gray-500 h-full w-8"
      >
        <ChevronDownIcon className="h-4 w-4" />
      </div>
    </div>
  )
}
