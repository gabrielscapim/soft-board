import { Outlet } from 'react-router'
import { NavBar } from '../NavBar'
import { useBoard } from '../../hooks'

export function Layout () {
  const board = useBoard()

  return (
    <div className="h-screen flex flex-col">
      <NavBar boardState={board.boardState} boardController={board.boardController} />
      <div className="flex grow">
        <Outlet />
      </div>
    </div>
  )
}
