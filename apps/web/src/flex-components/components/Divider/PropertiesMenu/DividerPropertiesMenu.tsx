import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { DividerFlexComponentProperties } from '@/types'

const COLORS = [
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

export function DividerPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const properties = props.properties as DividerFlexComponentProperties

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
    </>
  )
}
