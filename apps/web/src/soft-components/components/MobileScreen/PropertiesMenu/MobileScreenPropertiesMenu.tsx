import { useBoardStore } from '@/components'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SoftComponentPropertiesMenuProps } from '@/soft-components/types'
import { MobileScreenSoftComponentProperties } from '@/types'
import { useTranslation } from 'react-i18next'

export function MobileScreenPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const { boardState } = props

  const { t } = useTranslation('soft-components')
  const components = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)

  const properties = props.properties as MobileScreenSoftComponentProperties
  const currentMobileScreens = components.filter(c => c.type === 'mobileScreen')

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          {t('main')}
          <p className="text-xs text-muted-foreground">
            {t('mobileScreenPropertiesMenu.mainDescription')}
          </p>
        </div>
        <Switch
          checked={properties.main ?? false}
          disabled={!properties.main && currentMobileScreens.some(screen => screen.id !== props.component.id && screen.properties.main)}
          onCheckedChange={value => props.onUpdateProperties('main', value)}
        />
      </Label>
    </>
  )
}
