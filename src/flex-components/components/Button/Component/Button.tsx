import clsx from 'clsx'
import { FlexComponentProps } from '../../../types'
import { ButtonFlexComponentProperties } from '../../../../types'

export function ButtonFlexComponent (props: FlexComponentProps) {
  const { component, handleAction } = props

  const properties = component.properties as ButtonFlexComponentProperties
  const color = properties.color ?? 'primary'

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'font-semibold',
        'inline-flex',
        'items-center',
        'justify-center',
        'select-none',
        'overflow-hidden',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'bg-flex-component-black',
        color === 'primary' && 'text-flex-component-white',
        color === 'secondary' && 'bg-flex-component-gray-light',
        color === 'secondary' && 'text-flex-component-black',
      )}
      style={{
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        borderRadius: `${properties.borderRadius}px`,
        fontSize: `${properties.fontSize}px`,
        zIndex: properties.zIndex,
        paddingLeft: `${properties.paddingLeft}px`,
        paddingRight: `${properties.paddingRight}px`,
        paddingTop: `${properties.paddingTop}px`,
        paddingBottom: `${properties.paddingBottom}px`
      }}
      onClick={() => handleAction?.(component, 'onClick')}
    >
      Button
    </div>
  )
}
