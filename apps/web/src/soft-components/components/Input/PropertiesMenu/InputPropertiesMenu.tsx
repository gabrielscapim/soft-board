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
import { InputSoftComponentProperties } from '@/types'
import { useTranslation } from 'react-i18next'

const VARIANTS = [
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

const TEXT_ALIGNMENTS = [
  {
    value: 'left',
    label: 'left'
  },
  {
    value: 'center',
    label: 'center'
  },
  {
    value: 'right',
    label: 'right'
  }
]

export function InputPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as InputSoftComponentProperties

  const { t } = useTranslation('soft-components')

  return (
    <>
      <Label className="grid gap-2">
        {t('variants', { count: 2 })}
        <Select
          value={properties.variant ?? 'primary'}
          onValueChange={value => props.onUpdateProperties('variant', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('variants', { count: 1 })} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {VARIANTS.map(variant => (
              <SelectItem key={variant.value} value={variant.value}>
                {t(variant.label)}
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
        {t('fontSize')}
        <Input
          type="number"
          value={properties.fontSize ?? 0}
          onChange={event => props.onUpdateProperties('fontSize', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        {t('placeholder')}
        <Input
          type="text"
          value={properties.placeholder ?? ''}
          onChange={event => props.onUpdateProperties('placeholder', event.target.value)}
        />
      </Label>

      <Label className="grid gap-2">
        {t('textAlign')}
        <Select
          value={properties.textAlign ?? 'left'}
          onValueChange={value => props.onUpdateProperties('textAlign', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('textAlign')} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {TEXT_ALIGNMENTS.map(alignment => (
              <SelectItem key={alignment.value} value={alignment.value}>
                {t(alignment.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
