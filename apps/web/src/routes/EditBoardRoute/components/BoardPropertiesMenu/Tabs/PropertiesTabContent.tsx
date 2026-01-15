import { Input, Label } from '@/components'
import { SOFT_COMPONENT_MIN_DIMENSIONS, SOFT_COMPONENTS_PROPERTIES_MENU } from '@/flex-components'
import { BoardState } from '@/lib'
import { SoftComponent } from '@/types'

export type PropertiesTabContentProps = {
  softComponent: SoftComponent
  screen: SoftComponent | null
  boardState: BoardState
  onUpdateProperties (key: string, value: unknown): void
  onUpdateName (value: string): void
}

export function PropertiesTabContent (props: PropertiesTabContentProps) {
  const { softComponent, screen, boardState, onUpdateProperties, onUpdateName } = props

  const Menu = SOFT_COMPONENTS_PROPERTIES_MENU[softComponent.type]
  const minDimensions = SOFT_COMPONENT_MIN_DIMENSIONS[softComponent.type]

  const relX = screen ? softComponent.properties.x - screen.properties.x : softComponent.properties.x
  const relY = screen ? softComponent.properties.y - screen.properties.y : softComponent.properties.y
  return (
    <>
      <Label className="flex flex-col items-start">
        Name
        <Input
          value={softComponent.name}
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
              step="1"
              min={minDimensions.width}
              disabled={softComponent.type === 'mobileScreen'}
              value={Math.round(softComponent.properties.width)}
              onChange={event => onUpdateProperties('width', clampInt(event.target.value, minDimensions.width))}
            />
          </Label>
          <Label className="text-xs">
            H
            <Input
              type="number"
              step="1"
              min={minDimensions.height}
              value={Math.round(softComponent.properties.height)}
              onChange={event => onUpdateProperties('height', clampInt(event.target.value, minDimensions.height))}
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
              step="1"
              value={Math.round(relX)}
              onChange={event => onUpdateProperties('x', Number(event.target.value))}
            />
          </Label>
          <Label className="text-xs">
            Y
            <Input
              type="number"
              step="1"
              value={Math.round(relY)}
              onChange={event => onUpdateProperties('y', Number(event.target.value))}
            />
          </Label>
        </div>
      </div>

      {Menu && (
        <Menu
          properties={softComponent.properties}
          boardState={boardState}
          component={softComponent}
          onUpdateProperties={onUpdateProperties}
        />
      )}
    </>
  )
}

function clampInt (value: string, min: number) {
  return Math.max(min, Math.round(Number(value)))
}
