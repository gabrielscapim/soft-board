import { useEffect, useState } from 'react'
import { useSelectedFlexComponent } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { Floating } from '../Floating'
import { FlexComponentProperties, FlexComponentProperty } from '../../types'
import { BasePropertyInput } from './subcomponents'
import { Input } from '../Input'


const baseInputs: { name: string, property: FlexComponentProperty }[] = [
  { name: 'X', property: 'x' },
  { name: 'Y', property: 'y' },
  { name: 'W', property: 'width' },
  { name: 'H', property: 'height' }
]

export type FlexComponentPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
}

export function FlexComponentPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const { boardState, boardController } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const [name, setName] = useState<string>(selectedFlexComponent?.name ?? '')
  const [properties, setProperties] = useState<FlexComponentProperties>({
    x: selectedFlexComponent?.properties.x ?? 0,
    y: selectedFlexComponent?.properties.y ?? 0,
    width: selectedFlexComponent?.properties.width ?? 0,
    height: selectedFlexComponent?.properties.height ?? 0,
  })

  const onBlur = () => {
    if (selectedFlexComponent) {
      boardController.onUpdateFlexComponent({
        flexComponent: {
          ...selectedFlexComponent,
          name
        },
        properties
      })
    }
  }

  useEffect(() => {
    if (selectedFlexComponent) {
      setName(selectedFlexComponent.name)
      setProperties(selectedFlexComponent.properties)
    }
  }, [selectedFlexComponent])

  return (
    <>
      {selectedFlexComponent && (
        <Floating className="top-20 right-4">
          <ul className="menu bg-base-200 text-base-content min-h-full w-52 rounded-box h-[calc(100vh-6rem)]">
            <Input
              label="Name"
              size="xs"
              onBlur={onBlur}
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <span className="divider my-1" />
            <div className="flex flex-col gap-2">
              <li>Properties</li>
              {baseInputs.map(input => (
                <BasePropertyInput
                  key={`input-${input.property}`}
                  property={input.property}
                  name={input.name}
                  properties={properties}
                  onBlur={onBlur}
                  onUpdateProperties={(property, value) => setProperties(prevState => ({ ...prevState, [property]: value }))}
                />
              ))}
            </div>
          </ul>
        </Floating>
      )}
    </>
  )
}
