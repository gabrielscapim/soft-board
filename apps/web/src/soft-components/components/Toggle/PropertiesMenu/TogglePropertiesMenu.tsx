import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { ToggleSoftComponentProperties } from '@/types'
import { useTranslation } from 'react-i18next'

export function TogglePropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as ToggleSoftComponentProperties

  const { t } = useTranslation('soft-components')

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          {t('activated')}
          <p className="text-xs text-muted-foreground">
            {t('togglePropertiesMenu.activatedDescription')}
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
