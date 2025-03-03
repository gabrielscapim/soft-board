import { Bold, Italic } from 'lucide-react'
import { TextFlexComponentProperties } from '../../../types'
import { Button } from '../../Button'
import { Select } from '../../Select'
import clsx from 'clsx'
import { FlexComponentPropertiesInputsProps } from '../FlexComponentPropertiesMenu'

const FONT_SIZE_OPTIONS = [
  { value: '8', label: '8px' },
  { value: '10', label: '10px' },
  { value: '12', label: '12px' },
  { value: '14', label: '14px' },
  { value: '16', label: '16px' },
  { value: '18', label: '18px' },
  { value: '20', label: '20px' },
  { value: '24', label: '24px' },
  { value: '28', label: '28px' },
  { value: '32', label: '32px' },
  { value: '36', label: '36px' },
  { value: '40', label: '40px' },
  { value: '48', label: '48px' },
  { value: '56', label: '56px' },
  { value: '64', label: '64px' },
  { value: '72', label: '72px' },
  { value: '80', label: '80px' },
  { value: '96', label: '96px' }
]

const TEXT_ALIGN_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' }
]

export function TextPropertyInputs (props: FlexComponentPropertiesInputsProps) {
  const { flexComponent, boardController } = props

  const onChange = (newProperties: Partial<TextFlexComponentProperties>) => {
    boardController.onUpdateFlexComponent({ flexComponent: { ...flexComponent, properties: { ...flexComponent.properties, ...newProperties } } })
  }

  const properties = flexComponent.properties as TextFlexComponentProperties

  return (
    <>
      <li className="pb-2">Text</li>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Select
            size="xs"
            value={String(properties.fontSize ?? 16)}
            options={FONT_SIZE_OPTIONS}
            onChange={event => onChange({ fontSize: Number(event.target.value) })}
          />
          <Select
            size="xs"
            value={properties.align ?? 'left'}
            options={TEXT_ALIGN_OPTIONS}
            onChange={event => onChange({ align: event.target.value as TextFlexComponentProperties['align'] })}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className={clsx({ 'btn-primary': properties.bold })}
            square
            size="sm"
            onClick={() => onChange({ bold: !properties.bold })}
          >
            <Bold size={16} />
          </Button>
          <Button
            className={clsx({ 'btn-primary': properties.italic })}
            square
            size="sm"
            onClick={() => onChange({ italic: !properties.italic })}
          >
            <Italic size={16} />
          </Button>
        </div>
      </div>
    </>
  )
}
