import clsx from 'clsx'
import { ToggleFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function ToggleFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as ToggleFlexComponentProperties

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        properties.absolute === false ? 'static' : 'absolute'
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
          properties.activated ? 'bg-flex-component-black' : 'bg-flex-component-gray-medium'
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
            'bg-flex-component-white',
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
