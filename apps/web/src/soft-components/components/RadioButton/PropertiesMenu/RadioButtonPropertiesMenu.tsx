import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { RadioButtonSoftComponentProperties } from '@/types'
import { useTranslation } from 'react-i18next'

export function RadioButtonPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const { t } = useTranslation('soft-components')
  const properties = props.properties as RadioButtonSoftComponentProperties

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          {t('activated')}
          <p className="text-xs text-muted-foreground">
            {t('radioButtonPropertiesMenu.activatedDescription')}
          </p>
        </div>
        <Switch
          id="shape-fill"
          checked={properties.activated ?? false}
          onCheckedChange={value => props.onUpdateProperties('activated', value)}
        />
      </Label>
    </>
  )
}
