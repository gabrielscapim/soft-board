import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SoftComponentPropertiesMenuProps } from '@/flex-components/types'
import { RadioButtonSoftComponentProperties } from '@/types'

export function RadioButtonPropertiesMenu (props: SoftComponentPropertiesMenuProps) {
  const properties = props.properties as RadioButtonSoftComponentProperties

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
          checked={properties.activated ?? false}
          onCheckedChange={value => props.onUpdateProperties('activated', value)}
        />
      </Label>
    </>
  )
}
