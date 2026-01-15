import clsx from 'clsx'
import { ToggleSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'

export function ToggleSoftComponent (props: SoftComponentProps) {
  const { component, className } = props

  const properties = component.properties as ToggleSoftComponentProperties

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
      <div
        className={clsx(
          'absolute',
          'w-full',
          'h-full',
          'pointer-events-none',
          'rounded-full',
          properties.activated ? 'bg-soft-component-black' : 'bg-soft-component-gray-medium'
        )}
        style={{
          width: `${properties.width}px`,
          height: `${properties.height}px`
        }}
      >
        <div
          className={clsx(
            'relative',
            'top-1/2',
            'left-[3px]',
            '-translate-y-1/2',
            'rounded-full',
            'bg-soft-component-white',
            properties.activated ? 'left-[calc(100%-calc(50%+6px))]' : 'left-[3px]'
          )}
          style={{
            width: 0.52 * properties.width,
            height: 0.52 * properties.width
          }}
        />
      </div>
    </div>
  )
}
