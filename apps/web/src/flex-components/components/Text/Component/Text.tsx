import clsx from 'clsx'
import { FlexComponentProperties, TextFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function TextFlexComponent (props: FlexComponentProps) {
  const { component, boardController, editable, className } = props

  const properties = component.properties as TextFlexComponentProperties
  const color = properties.color ?? 'primary'

  return (
    <span
      id={component.id}
      contentEditable={editable}
      suppressContentEditableWarning
      spellCheck={false}
      className={clsx(
        'draggable-group',
        'outline-none',
        'text-black',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'text-flex-component-black',
        color === 'secondary' && 'text-flex-component-gray-medium',
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
      onBlur={event => {
        if (!editable) return

        boardController?.onUpdateFlexComponentProperty({
          id: component.id,
          property: 'text' as keyof FlexComponentProperties,
          value: event.currentTarget.textContent
        })
      }}
    >
      {properties.text}
    </span>
  )
}
