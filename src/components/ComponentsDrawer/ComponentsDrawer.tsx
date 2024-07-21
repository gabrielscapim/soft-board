import { createElement, PropsWithChildren } from 'react'
import { FLEX_COMPONENT_ICONS, FLEX_COMPONENT_NAMES } from '../../flex-components'
import { FlexComponentType } from '../../types'
import clsx from 'clsx'

export type ComponentsDrawerProps = PropsWithChildren & {
  open?: boolean
}

export function ComponentsDrawer (props: ComponentsDrawerProps) {
  const { open } = props

  return (
    <div
      className={clsx('drawer', open && 'drawer-open')}
    >
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-between h-screen">
        {props.children}
      </div>
      <div
        className={clsx('drawer-side', !open && 'mt-16')}
      >
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
