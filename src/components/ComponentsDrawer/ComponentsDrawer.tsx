import { createElement, PropsWithChildren } from 'react'
import { FLEX_COMPONENT_ICONS, FLEX_COMPONENT_NAMES } from '../../flex-components'
import { FlexComponentType } from '../../types'

export function ComponentsDrawer (props: PropsWithChildren) {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-between">
        {props.children}
      </div>
      <div className="drawer-side">
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
          <li className="menu-title">Components</li>
          {Object.entries(FLEX_COMPONENT_NAMES).map(component => {
            const type = component[0] as FlexComponentType
            const name = component[1]

            return (
              <li key={component[0]}>
                <a>
                  {createElement(FLEX_COMPONENT_ICONS[type])}
                  {name}
                </a>
              </li>
          )})}
        </ul>
      </div>
    </div>
  )
}
