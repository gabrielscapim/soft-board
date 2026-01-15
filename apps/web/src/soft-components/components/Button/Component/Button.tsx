import clsx from 'clsx'
import { SoftComponentProps } from '../../../types'
import { ButtonSoftComponentProperties, SoftComponentProperties } from '../../../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { ContentEditableText } from '@/components/common/ContentEditableText/ContentEditableText'

export function ButtonSoftComponent (props: SoftComponentProps) {
  const {
    component,
    boardController,
    editable,
    className,
    isDragging,
    isResizing,
    handleAction
  } = props

  const properties = component.properties as ButtonSoftComponentProperties
  const color = properties.color ?? 'primary'

  return (
    <div
      id={component.id}
      className={clsx(
        'draggable-group',
        'font-semibold',
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
        'select-none',
        'overflow-hidden',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'secondary' && 'bg-soft-component-gray-light',
        color === 'secondary' && 'text-soft-component-black',
        color === 'primary' && 'bg-soft-component-black',
        color === 'primary' && 'text-soft-component-white',
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
        paddingBottom: `${properties.paddingBottom}px`
      }}
      onClick={() => handleAction?.(component, 'onClick')}
    >
      {properties.icon && (
        <DynamicIcon
          name={properties.icon as IconName}
          className="w-5 h-5 shrink-0"
        />
      )}
      {properties.label && (
        <ContentEditableText
          text={properties.label}
          editable={editable && !isDragging && !isResizing}
          inline={false}
          className="w-full outline-none"
          onBlur={text => {
            boardController?.onUpdateSoftComponentProperty({
              id: component.id,
              property: 'label' as keyof SoftComponentProperties,
              value: text
            })
          }}
        />
      )}
    </div>
  )
}
