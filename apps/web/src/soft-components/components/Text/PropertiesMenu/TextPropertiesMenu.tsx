import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
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

const ALIGNMENTS = [
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
  },
  {
    value: 'justify',
    label: 'justify'
  }
]

const DECORATIONS = [
  {
    value: 'none',
    label: 'none'
  },
  {
    value: 'underline',
    label: 'underline'
  },
  {
    value: 'line-through',
    label: 'lineThrough'
  },
  {
    value: 'overline',
    label: 'overline'
  }
]

export function TextPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as TextSoftComponentProperties

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
        {t('fontSize')}
        <Input
          type="number"
          value={properties.fontSize ?? 0}
          onChange={event => props.onUpdateProperties('fontSize', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        {t('fontWeight')}
        <Input
          type="number"
          value={properties.fontWeight ?? 0}
          onChange={event => props.onUpdateProperties('fontWeight', Number(event.target.value))}
        />
      </Label>

      <Label className="flex flex-col items-start">
        {t('lineHeight')}
        <Input
          type="number"
          value={properties.lineHeight ?? 0}
          onChange={event => props.onUpdateProperties('lineHeight', Number(event.target.value))}
        />
      </Label>

      <Label className="grid gap-2">
        {t('align')}
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
                {t(alignment.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Label className="grid gap-2">
        {t('decoration')}
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
                {t(decoration.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>
    </>
  )
}
