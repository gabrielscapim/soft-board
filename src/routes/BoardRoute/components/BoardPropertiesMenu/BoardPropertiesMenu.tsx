import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FLEX_COMPONENT_NAMES } from '@/flex-components'
import { FLEX_COMPONENTS_PROPERTIES_MENU } from '@/flex-components/registry/properties-menu'
import { BoardController, BoardState } from '@/lib'
import { FlexComponent } from '@/types'
import clsx, { ClassValue } from 'clsx'

export type BoardPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
  selected: FlexComponent
  className?: ClassValue
}

export function BoardPropertiesMenu (props: BoardPropertiesMenuProps) {
  const { selected, className } = props

  const Menu = FLEX_COMPONENTS_PROPERTIES_MENU[selected.type]

  return (
    <div
      className={clsx('bg-sidebar absolute top-20 right-4 rounded-xl border w-80 shadow-md', className)}
      style={{ zIndex: 100_000 }}
    >
      <div className="gap-3.5 border-b p-4">
        <div className="text-foreground text-base font-medium">
          {FLEX_COMPONENT_NAMES[selected.type]} properties
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <Label className="flex flex-col items-start">
          Name
          <Input value={selected.name} />
          <span className="text-xs text-muted-foreground">
            Used to identify the component on the board.
          </span>
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
      </div>
    </div>
  )
}
