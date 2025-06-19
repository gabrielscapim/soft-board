import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { BoardPropertiesMenuProps } from '@/flex-components/types'
import { ToggleFlexComponentProperties } from '@/types'

export function TogglePropertiesMenu (props: BoardPropertiesMenuProps) {
  const { selected } = props

  const properties = selected.properties as ToggleFlexComponentProperties

  return (
    <>
      <Label className="flex flex-row items-center justify-between border-input p-3 border rounded-md">
        <div className="flex flex-col gap-1">
          Activated
          <p className="text-xs text-muted-foreground">
            State of the toggle.
          </p>
        </div>
        <Switch id="shape-fill" checked={properties.activated} />
      </Label>
    </>
  )
}
