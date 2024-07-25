import { useEffect, useState } from 'react'
import { useSelectedFlexComponent } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { Floating } from '../Floating'
import { FlexComponentProperties } from '../../types'

export type FlexComponentPropertiesMenuProps = {
  boardState: BoardState
  boardController: BoardController
}

export function FlexComponentPropertiesMenu (props: FlexComponentPropertiesMenuProps) {
  const { boardState, boardController } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const [properties, setProperties] = useState<FlexComponentProperties>({
    x: selectedFlexComponent?.properties.x ?? 0,
    y: selectedFlexComponent?.properties.y ?? 0,
    width: selectedFlexComponent?.properties.width ?? 0,
    height: selectedFlexComponent?.properties.height ?? 0,
  })

  const onUpdateProperties = (key: string, value: number) => {
    setProperties(prevState => ({ ...prevState, [key]: value }))
  }

  const onBlur = () => {
    if (selectedFlexComponent) {
      boardController.onUpdateFlexComponentProperties({
        flexComponent: selectedFlexComponent,
        properties
      })
    }
  }

  useEffect(() => {
    if (selectedFlexComponent) {
      setProperties(selectedFlexComponent.properties)
    }
  }, [selectedFlexComponent])


  return (
    <>
      {selectedFlexComponent && (
        <Floating className="top-20 right-4">
          <ul className="menu bg-base-200 text-base-content min-h-full w-52 rounded-box h-[calc(100vh-6rem)]">
            <li className="menu-title select-none">{selectedFlexComponent.name}</li>
            <div className="px-2 my-2 flex flex-col gap-2">
              <label className="input input-xs input-bordered flex items-center gap-2">
                <span className="w-4">X</span>
                <input
                  type="text"
                  className="grow"
                  placeholder="X-position"
                  value={properties.x}
                  onChange={event => onUpdateProperties('x', Number(event.target.value))}
                  onBlur={onBlur}
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      onBlur()
                    }
                  }}
                />
              </label>
              <label className="input input-xs input-bordered flex items-center gap-2">
                <span className="w-4">Y</span>
                <input
                  type="text"
                  className="grow"
                  placeholder="Y-position"
                  value={properties.y}
                  onChange={event => onUpdateProperties('y', Number(event.target.value))}
                  onBlur={onBlur}
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      onBlur()
                    }
                  }}
                />
              </label>
              <label className="input input-xs input-bordered flex items-center gap-2">
                <span className="w-4">W</span>
                <input
                  type="text"
                  className="grow"
                  placeholder="Width"
                  value={properties.width}
                  onChange={event => onUpdateProperties('width', Number(event.target.value))}
                  onBlur={onBlur}
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      onBlur()
                    }
                  }}
                />
              </label>
              <label className="input input-xs input-bordered flex items-center gap-2">
                <span className="w-4">H</span>
                <input
                  type="number"
                  className="grow"
                  placeholder="Height"
                  value={properties.height}
                  onChange={event => onUpdateProperties('height', Number(event.target.value))}
                  onBlur={onBlur}
                  onKeyDown={event => {
                    console.log(event)
                    if (event.key === 'Enter') {
                      onBlur()
                    }
                  }}
                />
              </label>
            </div>
          </ul>
        </Floating>
      )}
    </>
  )
}
