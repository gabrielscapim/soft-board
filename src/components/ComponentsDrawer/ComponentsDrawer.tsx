import { FLEX_COMPONENT_NAMES } from '../../flex-components'

export function ComponentsDrawer () {
  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
          {FLEX_COMPONENT_NAMES.map(name => (
            <li><a>{name}</a></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
