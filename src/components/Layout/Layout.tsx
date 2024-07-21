import { useState } from 'react'
import { Board } from '../Board'
import { ComponentsDrawer } from '../ComponentsDrawer'
import { NavBar } from '../NavBar'

export function Layout () {
  const [componentsDrawerOpen, setComponentsDrawerOpen] = useState(true)

  return (
    <>
      <NavBar
        onHandleComponentDrawer={() => setComponentsDrawerOpen(!componentsDrawerOpen)}
      />
      <ComponentsDrawer
        open={componentsDrawerOpen}
      >
        <Board />
      </ComponentsDrawer>
    </>
  )
}
