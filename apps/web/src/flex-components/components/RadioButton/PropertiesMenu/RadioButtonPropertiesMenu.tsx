import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FlexComponentPropertiesMenuProps } from '@/flex-components/types'
import { RadioButtonFlexComponentProperties } from '@/types'

export function RadioButtonPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const properties = props.properties as RadioButtonFlexComponentProperties

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          Activated
          <p className="text-xs text-muted-foreground">
            State of the radio button.
          </p>
        </div>
        <Switch
          id="shape-fill"
          checked={properties.activated}
          onCheckedChange={value => props.onUpdateProperties('activated', value)}
        />
      </Label>
    </>
  )
}
