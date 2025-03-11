import GitHubIcon from '../../public/github-icon.svg'
import { useTheme } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useLocation } from 'react-router'
import { WireframeModeButton, ZoomController } from './components'

export type NavBarProps = {
  boardController: BoardController
  boardState: BoardState
}

export function NavBar (props: NavBarProps) {
  const theme = useTheme()
  const location = useLocation()

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start" />
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Flex Board</a>
      </div>
      <div className="navbar-end">
        {location.pathname === '/' && <ZoomController {...props} />}
        <div className="flex flex-row gap-2">
          <WireframeModeButton />
          <a
            className="btn btn-ghost btn-circle btn-sm"
            href="https://github.com/gabrielscapim/flex-board"
            target="_blank"
          >
            <img
              src={GitHubIcon}
              alt="Github icon"
            />
          </a>
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
            <input
              type="checkbox"
              className="theme-controller" value="synthwave"
              onChange={theme.handleChange}
            />
            <SunIcon className="swap-off w-5 h-5" />
            <MoonIcon className="swap-on w-5 h-5" />
          </label>
        </div>
      </div>
    </div>
  )
}
