import clsx from 'clsx'
import { TextFlexComponentProperties } from '../../../../types'
import { FlexComponentProps } from '../../../types'

export function TextFlexComponent (props: FlexComponentProps) {
  const { component, boardController } = props

  const properties = component.properties as TextFlexComponentProperties
  const color = properties.color ?? 'primary'

  return (
    <span
      id={component.id}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={clsx(
        'draggable-group',
        'outline-none',
        'text-black',
        properties.absolute === false ? 'static' : 'absolute',
        color === 'primary' && 'text-flex-component-black',
        color === 'secondary' && 'text-flex-component-gray-medium'
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
        textAlign: properties.align,
        fontStyle: properties.italic ? 'italic' : 'normal',
        lineHeight: `${properties.lineHeight}px`,
        overflow: 'hidden',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
      onBlur={event => {
        boardController?.onUpdateFlexComponent({ flexComponent: {  ...component, properties: { ...properties, text: event.currentTarget.textContent } as TextFlexComponentProperties }})
      }}
    >
      {properties.text}
    </span>
  )
}
