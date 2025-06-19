import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { TextFlexComponentProperties } from '@/types'
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

export function TextPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const { selected } = props

  const properties = selected.properties as TextFlexComponentProperties

  return (
    <>
      <Label className="grid gap-2">
        Color
        <Select value={properties.color}>
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
        <Input type="number" value={properties.fontSize} />
      </Label>

      <Label className="flex flex-col items-start">
        Font weight
        <Input type="number" value={properties.fontWeight} />
      </Label>

      <Label className="flex flex-col items-start">
        Line weight
        <Input type="number" value={properties.lineHeight} />
      </Label>

      <Label className="grid gap-2">
        Align
        <Select value={properties.align}>
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
        <Select value={properties.decoration ?? 'none'}>
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
