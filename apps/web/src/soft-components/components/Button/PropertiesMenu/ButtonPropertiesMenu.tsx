import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { ButtonSoftComponentProperties } from '@/types'
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

export function ButtonPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as ButtonSoftComponentProperties

  const { t } = useTranslation('soft-components')

  return (
    <>
      <Label className="flex flex-col items-start">
        {t('borderRadius')}
        <Input
          type="number"
          value={properties.borderRadius ?? 0}
          onChange={event => props.onUpdateProperties('borderRadius', Number(event.target.value))}
        />
      </Label>

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

      <Label className="flex flex-col items-start">
        {t('fontSize')}
        <Input
          type="number"
          value={properties.fontSize ?? 0}
          onChange={event => props.onUpdateProperties('fontSize', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        {t('icon')}
        <Input
          type="text"
          value={properties.icon ?? ''}
          onChange={event => props.onUpdateProperties('icon', event.target.value)}
        />
      </Label>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          {t('padding')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs flex flex-col gap-1 items-start">
            {t('left')}
            <Input
              type="number"
              className="w-full"
              value={properties.paddingLeft ?? 0}
              onChange={event => props.onUpdateProperties('paddingLeft', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            {t('right')}
            <Input
              type="number"
              className="w-full"
              value={properties.paddingRight ?? 0}
              onChange={event => props.onUpdateProperties('paddingRight', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            {t('top')}
            <Input
              type="number"
              className="w-full"
              value={properties.paddingTop ?? 0}
              onChange={event => props.onUpdateProperties('paddingTop', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs flex flex-col gap-1 items-start">
            {t('bottom')}
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
