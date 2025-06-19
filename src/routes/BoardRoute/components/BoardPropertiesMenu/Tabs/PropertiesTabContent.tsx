import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BoardPropertiesMenuTabProps } from '../BoardPropertiesMenu'
import { FLEX_COMPONENTS_PROPERTIES_MENU } from '@/flex-components/registry/properties-menu'

export function PropertiesTabContent (props: BoardPropertiesMenuTabProps) {
  const { selected } = props

  const Menu = FLEX_COMPONENTS_PROPERTIES_MENU[selected.type]

  return (
    <>
      <Label className="flex flex-col items-start">
        Name
        <Input value={selected.name} />
      </Label>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          Dimension
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs">
            W
            <Input type="number" value={selected.properties.width} />
          </Label>
          <Label className="text-xs">
            H
            <Input type="number" value={selected.properties.height} />
          </Label>
        </div>
      </div>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          Position
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs">
            X
            <Input type="number" value={selected.properties.x} />
          </Label>
          <Label className="text-xs">
            Y
            <Input type="number" value={selected.properties.y} />
          </Label>
        </div>
      </div>

      {Menu && <Menu {...props} />}
    </>
  )
}
