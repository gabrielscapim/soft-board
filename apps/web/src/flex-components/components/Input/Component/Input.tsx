import clsx from 'clsx'
import { InputSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

export function InputSoftComponent (props: SoftComponentProps) {
  const { component, className } = props

  const properties = component.properties as InputSoftComponentProperties

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
        tertiary && 'border-flex-component-gray-light',
        className
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
        textAlign: properties.textAlign as React.CSSProperties['textAlign'] | undefined
      }}
    >
      {properties.leftIcon && <DynamicIcon size={20} name={properties.leftIcon as IconName} className="mr-2" />}
      <span className="w-full">{properties.placeholder ?? 'Placeholder'}</span>
      {properties.rightIcon && <DynamicIcon size={20} name={properties.rightIcon as IconName} />}
    </div>
  )
}
