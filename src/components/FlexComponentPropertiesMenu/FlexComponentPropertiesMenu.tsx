import { createElement, useEffect, useMemo, useState } from 'react'
import { useFlexComponents, useSelectedFlexComponent } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { Floating } from '../Floating'
import { FlexComponent, FlexComponentProperty, FlexComponentType } from '../../types'
import { BasePropertyInput, TextPropertyInputs } from './subcomponents'
import { Input } from '../Input'
import { Select } from '../Select'
import { UUID } from '../../types/common/uuid'

const BASE_INPUTS: { name: string, property: FlexComponentProperty }[] = [
  { name: 'X', property: 'x' },
  { name: 'Y', property: 'y' },
  { name: 'W', property: 'width' },
  { name: 'H', property: 'height' }
]

const INPUTS_BY_TYPE: Partial<Record<FlexComponentType, typeof TextPropertyInputs>> = {
  text: TextPropertyInputs
}

export type FlexComponentPropertiesInputsProps = {
  flexComponent: FlexComponent
  boardController: BoardController
}

export type FlexComponentPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
}

export function FlexComponentPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const { boardState, boardController } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const flexComponents = useFlexComponents(boardState)

  const [flexComponent, setFlexComponent] = useState<FlexComponent | null>(selectedFlexComponent)

  useEffect(() => {
    if (selectedFlexComponent) {
      setFlexComponent(selectedFlexComponent)
    }
  }, [selectedFlexComponent])

  const onBlur = () => {
    if (flexComponent) {
      boardController.onUpdateFlexComponent({ flexComponent })
    }
  }

  const connectionOptions = useMemo(() => {
    const options = flexComponents
      .filter(fc => fc.id !== flexComponent?.id)
      .map(flexComponent => ({ value: flexComponent.id, label: flexComponent.name }))

    return [
      { value: '', label: 'Select a connection' },
      ...options
    ]
  }, [flexComponents, flexComponent])

  return (
    <>
      {selectedFlexComponent && (
        <Floating className="top-20 right-4">
          <ul className="menu bg-base-200 text-base-content min-h-full w-52 rounded-box h-[calc(100vh-6rem)]">
            <li className="pb-2">Name</li>
            <Input
              size="xs"
              onBlur={onBlur}
              value={flexComponent?.name ?? ''}
              onChange={event => setFlexComponent(prevState => prevState ? { ...prevState, name: event.target.value } : null)}
            />

            <span className="divider my-1" />
            <div className="flex flex-col gap-2">
              <li>Properties</li>
              {BASE_INPUTS.map(input => (
                <BasePropertyInput
                  key={`input-${input.property}`}
                  property={input.property}
                  name={input.name}
                  properties={flexComponent?.properties}
                  onBlur={onBlur}
                  onUpdateProperties={(property, value) => {
                    setFlexComponent(prevState => prevState ? { ...prevState, properties: { ...prevState.properties, [property]: value } } : null)
                  }}
                />
              ))}
            </div>

            <span className="divider my-1" />
            <li className="pb-2">Connection</li>
            <Select
              size="xs"
              options={connectionOptions}
              value={flexComponent?.connection ?? ''}
              onChange={event => {
                const connection = event.target.value === '' ? null : event.target.value as UUID

                if (flexComponent) {
                  boardController.onUpdateFlexComponent({ flexComponent: { ...flexComponent, connection } })
                }
              }}
            />

            {flexComponent?.type && INPUTS_BY_TYPE[flexComponent.type] && (
              <>
                <span className="divider my-1" />
                {createElement(
                  INPUTS_BY_TYPE[flexComponent.type]!,
                  {
                    flexComponent,
                    boardController
                  }
                )}
              </>
            )}
          </ul>
        </Floating>
      )}
    </>
  )
}
