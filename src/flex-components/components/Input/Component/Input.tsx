import clsx from 'clsx'
import { InputFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

export function InputFlexComponent (props: FlexComponentProps) {
  const { component } = props

  const properties = component.properties as InputFlexComponentProperties

  const variant = properties.variant ?? 'primary'
  const primary = variant === 'primary'
  const secondary = variant === 'secondary'
  const tertiary = variant === 'tertiary'

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'flex',
        'items-center',
        'select-none',
        'font-light',
        'overflow-hidden',
        'text-flex-component-gray-medium',
        properties.absolute === false ? 'static' : 'absolute',
        primary && 'bg-flex-component-gray-light',
        (secondary || tertiary) && 'bg-flex-component-white',
        secondary && 'border-2',
        secondary && 'border-flex-component-gray-light',
        tertiary && 'border-b-2',
        tertiary && 'border-flex-component-gray-light'
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
        paddingBottom: `${properties.paddingBottom}px`,
        textAlign: properties.textAlign
      }}
    >
      {properties.leftIcon && <DynamicIcon size={20} name={properties.leftIcon as IconName} className="mr-2" />}
      <span className="w-full">{properties.placeholder ?? 'Placeholder'}</span>
      {properties.rightIcon && <DynamicIcon size={20} name={properties.rightIcon as IconName} />}
    </div>
  )
}
