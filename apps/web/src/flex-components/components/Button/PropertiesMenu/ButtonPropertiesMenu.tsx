import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { ButtonFlexComponentProperties } from '@/types'

const COLORS = [
  {
    value: 'primary',
    label: 'Primary'
  },
  {
    value: 'secondary',
    label: 'Secondary'
  }
]

export function ButtonPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const properties = props.properties as ButtonFlexComponentProperties

  console.log(properties.icon)

  return (
    <>
      <Label className="flex flex-col items-start">
        Border radius
        <Input
          type="number"
          value={properties.borderRadius ?? 0}
          onChange={event => props.onUpdateProperties('borderRadius', Number(event.target.value))}
        />
      </Label>

      <Label className="grid gap-2">
        Color
        <Select
          value={properties.color ?? 'primary'}
          onValueChange={value => props.onUpdateProperties('color', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {COLORS.map(color => (
              <SelectItem key={color.value} value={color.value}>
                {color.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex flex-col items-start">
        Label
        <Input
          type="text"
          value={properties.label ?? ''}
          onChange={event => props.onUpdateProperties('label', event.target.value)}
        />
      </Label>

      <Label className="flex flex-col items-start">
        Font size
        <Input
          type="number"
          value={properties.fontSize ?? 0}
          onChange={event => props.onUpdateProperties('fontSize', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        Icon
        <Input
          type="text"
          value={properties.icon ?? ''}
          onChange={event => props.onUpdateProperties('icon', event.target.value)}
        />
      </Label>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          Padding
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs flex flex-col gap-1 items-start">
            Left
            <Input
              type="number"
              className="w-full"
              value={properties.paddingLeft ?? 0}
              onChange={event => props.onUpdateProperties('paddingLeft', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Right
            <Input
              type="number"
              className="w-full"
              value={properties.paddingRight ?? 0}
              onChange={event => props.onUpdateProperties('paddingRight', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Top
            <Input
              type="number"
              className="w-full"
              value={properties.paddingTop ?? 0}
              onChange={event => props.onUpdateProperties('paddingTop', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Bottom
            <Input
              type="number"
              className="w-full"
              value={properties.paddingBottom ?? 0}
              onChange={event => props.onUpdateProperties('paddingBottom', Number(event.target.value))}
            />
          </Label>
        </div>
      </div>
    </>
  )
}
