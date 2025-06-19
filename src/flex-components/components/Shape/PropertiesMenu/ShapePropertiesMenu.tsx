import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { ShapeFlexComponentProperties } from '@/types'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

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

export function ShapePropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const properties = props.properties as ShapeFlexComponentProperties

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
        Border radius
        <Input type="number" value={properties.borderRadius} />
      </Label>

      <Label className="flex flex-col items-start">
        Border width
        <Input type="number" value={properties.borderWidth} />
      </Label>

      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          Fill
          <p className="text-xs text-muted-foreground">
            Fill shape with color.
          </p>
        </div>
        <Switch id="shape-fill" checked={properties.fill} />
      </Label>
    </>
  )
}
