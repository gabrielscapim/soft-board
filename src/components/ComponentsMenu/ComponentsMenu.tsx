import { createElement, PropsWithChildren } from 'react'
import { FLEX_COMPONENT_ICONS, FLEX_COMPONENT_NAMES } from '../../flex-components'
import { FlexComponentType } from '../../types'
import { BoardController } from '../../lib'
import { Floating } from '../Floating'
import { useScreenDimensions } from '../../hooks'

export type ComponentsMenuProps = PropsWithChildren & {
  boardController: BoardController
}

export function ComponentsMenu (props: ComponentsMenuProps) {
  const { boardController } = props

  const { width, height } = useScreenDimensions()

  return (
    <Floating className="top-20 left-4">
      <ul className="menu bg-base-200 text-base-content min-h-full w-56 rounded-box h-[calc(100vh-6rem)]">
        <li className="menu-title select-none">Components</li>
        {Object.entries(FLEX_COMPONENT_NAMES).map(component => {
          const type = component[0] as FlexComponentType
          const name = component[1]

          return (
            <li key={component[0]}>
              <a
                onClick={() => boardController.onAddFlexComponent(type, { x: width / 2, y: height / 2 })}
              >
                {createElement(FLEX_COMPONENT_ICONS[type])}
                {name}
              </a>
            </li>
          )})}
      </ul>
    </Floating>
  )
}
