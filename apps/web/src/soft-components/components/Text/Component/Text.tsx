import clsx from 'clsx'
import { SoftComponentProperties, TextSoftComponentProperties } from '../../../../types'
import { SoftComponentProps } from '../../../types'
import { ContentEditableText } from '@/components'

export function TextSoftComponent (props: SoftComponentProps) {
  const { component, boardController, editable, className, isDragging, isResizing } = props

  const properties = component.properties as TextSoftComponentProperties
  const color = properties.color ?? 'primary'

   return (
    <span
      id={component.id}
      className={clsx(
        'draggable-group',
        'outline-none',
        'text-black',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'text-soft-component-black',
        color === 'secondary' && 'text-soft-component-gray-medium',
        className
      )}
      style={{
        userSelect: 'none',
        zIndex: properties.zIndex,
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        fontSize: `${properties.fontSize}px`,
        fontWeight: properties.fontWeight,
        textAlign: properties.align as React.CSSProperties['textAlign'] | undefined,
        textDecoration: properties.decoration as React.CSSProperties['textDecoration'] | undefined,
        lineHeight: `${properties.lineHeight}px`,
        overflow: 'hidden',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
    >
      <ContentEditableText
        text={properties.text ?? ''}
        editable={editable && !isDragging && !isResizing}
        inline={false}
        className="w-full outline-none"
        onBlur={text => {
          boardController?.onUpdateSoftComponentProperty({
            id: component.id,
            property: 'text' as keyof SoftComponentProperties,
            value: text
          })
        }}
      />
    </span>
  )
}
