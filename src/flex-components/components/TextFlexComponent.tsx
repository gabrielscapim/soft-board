import clsx from 'clsx'
import { TextFlexComponentProperties } from '../../types'
import { FlexComponentProps } from '../flex-components'

export function TextFlexComponent (props: FlexComponentProps) {
  const { component, boardController } = props

  const properties = component.properties as TextFlexComponentProperties

  return (
    <span
      id={component.id}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={clsx(
        'absolute',
        'draggable-group',
        'outline-none',
        'text-black'
      )}
      style={{
        zIndex: properties.zIndex,
        top: `${properties.y}px`,
        left: `${properties.x}px`,
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        fontSize: `${properties.fontSize}px`,
        fontWeight: properties.bold ? 'bold' : 'normal',
        textAlign: properties.align,
        fontStyle: properties.italic ? 'italic' : 'normal',
        overflow: 'hidden',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
      onBlur={event => {
        boardController.onUpdateFlexComponent({flexComponent: {  ...component, properties: { ...properties, text: event.currentTarget.textContent } as TextFlexComponentProperties }})
      }}
    >
      {properties.text}
    </span>
  )
}
