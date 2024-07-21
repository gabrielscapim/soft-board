import { useState } from 'react'
import { Board } from '../Board'
import { ComponentsDrawer } from '../ComponentsDrawer'
import { NavBar } from '../NavBar'
import { BoardController, BoardState } from '../../lib'

export type LayoutProps = {
  boardState: BoardState
  boardController: BoardController
}

export function Layout (props: LayoutProps) {
  const { boardState, boardController } = props

  const [componentsDrawerOpen, setComponentsDrawerOpen] = useState(true)

  return (
    <>
      <NavBar
        onHandleComponentDrawer={() => setComponentsDrawerOpen(!componentsDrawerOpen)}
      />
      <ComponentsDrawer
        open={componentsDrawerOpen}
      >
        <Board
          boardState={boardState}
          boardController={boardController}
        />
      </ComponentsDrawer>
    </>
  )
}
