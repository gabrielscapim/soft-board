import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { ShapeSoftComponentProperties } from '@/types'
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
import { useTranslation } from 'react-i18next'

const COLORS = [
  {
    value: 'primary',
    label: 'primary'
  },
  {
    value: 'secondary',
    label: 'secondary'
  }
]

export function ShapePropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const { t } = useTranslation('soft-components')
  const properties = props.properties as ShapeSoftComponentProperties

  return (
    <>
      <Label className="grid gap-2">
        {t('color')}
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
                {t(color.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex flex-col items-start">
        {t('borderRadius')}
        <Input
          type="number"
          value={properties.borderRadius ?? 0}
          onChange={event => props.onUpdateProperties('borderRadius', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        {t('borderWidth')}
        <Input
          type="number"
          value={properties.borderWidth ?? 0}
          onChange={event => props.onUpdateProperties('borderWidth', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          {t('fill')}
          <p className="text-xs text-muted-foreground">
            {t('shapePropertiesMenu.fillDescription')}
          </p>
        </div>
        <Switch
          id="shape-fill"
          checked={properties.fill ?? false}
          onCheckedChange={value => props.onUpdateProperties('fill', value)}
        />
      </Label>
    </>
  )
}
