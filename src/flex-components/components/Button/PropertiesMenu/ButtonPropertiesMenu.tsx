import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { BoardPropertiesMenuProps } from '@/flex-components/types'
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

export function ButtonPropertiesMenu (props: BoardPropertiesMenuProps) {
  const { selected } = props

  const properties = selected.properties as ButtonFlexComponentProperties

  return (
    <>
      <Label className="flex flex-col items-start">
        Border radius
        <Input type="number" value={properties.borderRadius} />
      </Label>

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
        Label
        <Input type="number" value={properties.label} />
      </Label>

      <Label className="flex flex-col items-start">
        Font size
        <Input type="number" value={properties.fontSize} />
      </Label>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          Padding
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs flex flex-col gap-1 items-start">
            Left
            <Input type="number" className="w-full" value={properties.paddingLeft} />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Right
            <Input type="number" className="w-full" value={properties.paddingRight} />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Top
            <Input type="number" className="w-full" value={properties.paddingTop} />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            Bottom
            <Input type="number" className="w-full" value={properties.paddingBottom} />
          </Label>
        </div>
      </div>
    </>
  )
}
