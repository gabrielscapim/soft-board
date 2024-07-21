import { useState } from 'react'
import { Board, ComponentsDrawer } from './components'
import { NavBar } from './components/NavBar'
import './index.css'

function App () {
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

export default App
