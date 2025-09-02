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
import { InputFlexComponentProperties } from '@/types'

const VARIANTS = [
  {
    value: 'primary',
    label: 'Primary'
  },
  {
    value: 'secondary',
    label: 'Secondary'
  },
  {
    value: 'tertiary',
    label: 'Tertiary'
  }
]

const TEXT_ALIGNMENTS = [
  {
    value: 'left',
    label: 'Left'
  },
  {
    value: 'center',
    label: 'Center'
  },
  {
    value: 'right',
    label: 'Right'
  }
]

export function InputPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const properties = props.properties as InputFlexComponentProperties

  return (
    <>
      <Label className="grid gap-2">
        Variants
        <Select
          value={properties.variant ?? 'primary'}
          onValueChange={value => props.onUpdateProperties('variant', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {VARIANTS.map(variant => (
              <SelectItem key={variant.value} value={variant.value}>
                {variant.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex flex-col items-start">
        Border radius
        <Input
          type="number"
          value={properties.borderRadius ?? 0}
          onChange={event => props.onUpdateProperties('borderRadius', Number(event.target.value))}
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
        Placeholder
        <Input
          type="text"
          value={properties.placeholder ?? ''}
          onChange={event => props.onUpdateProperties('placeholder', event.target.value)}
        />
      </Label>

      <Label className="grid gap-2">
        Text alignment
        <Select
          value={properties.textAlign ?? 'left'}
          onValueChange={value => props.onUpdateProperties('textAlign', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select text alignment" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {TEXT_ALIGNMENTS.map(alignment => (
              <SelectItem key={alignment.value} value={alignment.value}>
                {alignment.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
