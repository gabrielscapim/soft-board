import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { DividerSoftComponentProperties } from '@/types'
import { useTranslation } from 'react-i18next'

const COLORS = [
  {
    value: 'primary',
    label: 'primary'
  },
  {
    value: 'secondary',
    label: 'secondary'
  },
  {
    value: 'tertiary',
    label: 'tertiary'
  }
]

export function DividerPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as DividerSoftComponentProperties

  const { t } = useTranslation('soft-components')

  return (
    <>
      <Label className="grid gap-2">
        {t('color')}
        <Select
          value={properties.color ?? 'primary'}
          onValueChange={value => props.onUpdateProperties('color', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('color')} />
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
    </>
  )
}
