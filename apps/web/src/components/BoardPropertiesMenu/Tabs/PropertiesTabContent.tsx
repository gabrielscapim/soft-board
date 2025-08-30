import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FLEX_COMPONENTS_PROPERTIES_MENU } from '@/flex-components/registry/properties-menu'
import { FlexComponent } from '@/types'

export type PropertiesTabContentProps = {
  flexComponent: FlexComponent
  onUpdateProperties (key: string, value: unknown): void
  onUpdateName (value: string): void
}

export function PropertiesTabContent (props: PropertiesTabContentProps) {
  const { flexComponent, onUpdateProperties, onUpdateName } = props

  const Menu = FLEX_COMPONENTS_PROPERTIES_MENU[flexComponent.type]

  return (
    <>
      <Label className="flex flex-col items-start">
        Name
        <Input
          value={flexComponent.name}
          onChange={event => onUpdateName(event.target.value)}
        />
      </Label>

      <div>
        <p className="text-sm leading-none font-medium select-none pb-3">
          Dimension
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Label className="text-xs">
            W
            <Input
              type="number"
              disabled={flexComponent.type === 'mobileScreen'}
              value={flexComponent.properties.width}
              onChange={event => onUpdateProperties('width', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs">
            H
            <Input
              type="number"
              value={flexComponent.properties.height}
              onChange={event => onUpdateProperties('height', Number(event.target.value))}
            />
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
            <Input
              type="number"
              value={flexComponent.properties.x}
              onChange={event => onUpdateProperties('x', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs">
            Y
            <Input
              type="number"
              value={flexComponent.properties.y}
              onChange={event => onUpdateProperties('y', Number(event.target.value))}
            />
          </Label>
        </div>
      </div>

      {Menu && (
        <Menu
          properties={flexComponent.properties}
          onUpdateProperties={onUpdateProperties}
        />
      )}
    </>
  )
}
