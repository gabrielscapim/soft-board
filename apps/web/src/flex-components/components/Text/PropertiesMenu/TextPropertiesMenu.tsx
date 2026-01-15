import { SoftComponentPropertiesMenuProps } from '@/flex-components/types'
import { TextSoftComponentProperties } from '@/types'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

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

const ALIGNMENTS = [
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
  },
  {
    value: 'justify',
    label: 'Justify'
  }
]

const DECORATIONS = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'underline',
    label: 'Underline'
  },
  {
    value: 'line-through',
    label: 'Line Through'
  },
  {
    value: 'overline',
    label: 'Overline'
  }
]

export function TextPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as TextSoftComponentProperties

  return (
    <>
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
        Font size
        <Input
          type="number"
          value={properties.fontSize ?? 0}
          onChange={event => props.onUpdateProperties('fontSize', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        Font weight
        <Input
          type="number"
          value={properties.fontWeight ?? 0}
          onChange={event => props.onUpdateProperties('fontWeight', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        Line weight
        <Input
          type="number"
          value={properties.lineHeight ?? 0}
          onChange={event => props.onUpdateProperties('lineHeight', Number(event.target.value))}
        />
      </Label>

      <Label className="grid gap-2">
        Align
        <Select
          value={properties.align ?? 'left'}
          onValueChange={value => props.onUpdateProperties('align', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {ALIGNMENTS.map(alignment => (
              <SelectItem key={alignment.value} value={alignment.value}>
                {alignment.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Label className="grid gap-2">
        Decoration
        <Select
          value={properties.decoration ?? 'none'}
          onValueChange={value => props.onUpdateProperties('decoration', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select decoration" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {DECORATIONS.map(decoration => (
              <SelectItem key={decoration.value} value={decoration.value}>
                {decoration.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>
    </>
  )
}
