import { useBoardStore } from '@/components'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { MobileScreenFlexComponentProperties } from '@/types'

export function MobileScreenPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const { boardState } = props

  const components = useBoardStore(boardState, 'flexComponentsChanged', state => state.flexComponents)

  const properties = props.properties as MobileScreenFlexComponentProperties
  const currentMobileScreens = components.filter(c => c.type === 'mobileScreen')

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          Main
          <p className="text-xs text-muted-foreground">
            Designates this screen as the main screen of the mobile app.
            Only one screen can be set as main.
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
