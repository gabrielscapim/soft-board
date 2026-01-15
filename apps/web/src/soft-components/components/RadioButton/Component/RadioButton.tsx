import clsx from 'clsx'
import { RadioButtonSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'

export function RadioButtonSoftComponent (props: SoftComponentProps) {
  const { component, className } = props

  const properties = component.properties as RadioButtonSoftComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        properties.absolute === false ? 'static' : 'absolute',
        className
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        zIndex: properties.zIndex
      }}
    >
      <div className="flex items-center h-full w-full space-x-2">
        <div
          className={clsx(
            'relative',
            'pointer-events-none',
            'rounded-full',
            'border-2',
            'border-soft-component-gray-medium',
            'flex-shrink-0'
          )}
          style={{
            width: `${properties.width}px`,
            height: `${properties.height}px`
          }}
        >
          {properties.activated && (
            <div
              className={clsx(
                'absolute',
                'top-1/2',
                'left-1/2',
                '-translate-x-1/2',
                '-translate-y-1/2',
                'rounded-full',
                'bg-soft-component-gray-medium'
              )}
              style={{
                width: 0.45 * properties.width,
                height: 0.45 * properties.width
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
