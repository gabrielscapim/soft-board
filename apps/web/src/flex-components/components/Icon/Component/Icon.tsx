import { IconFlexComponentProperties } from '../../../../types'
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic'
import clsx from 'clsx'
import { FlexComponentProps } from '../../../types'

export function IconFlexComponent (props: FlexComponentProps) {
  const { component, className } = props

  const properties = component.properties as IconFlexComponentProperties
  const icon = (properties.icon ?? 'sparkle') as IconName
  const color = properties.color ?? 'primary'

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' ? 'text-flex-component-black' : 'text-flex-component-gray-medium',
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
      <DynamicIcon
        name={iconNames.includes(icon) ? icon : 'sparkle'}
        style={{
          top: `${properties.y}px`,
          left: `${properties.x}px`,
          width: `${properties.width}px`,
          height: `${properties.height}px`,
          zIndex: properties.zIndex
        }}
      />
    </div>
  )
}
