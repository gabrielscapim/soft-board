import { Bars3BottomLeftIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import GitHubIcon from '../../public/github-icon.svg'
import { useTheme } from '../../hooks'

export type NavBarProps = {
  onHandleComponentDrawer?: () => void
}

export function NavBar (props: NavBarProps) {
  const { onHandleComponentDrawer } = props

  const theme = useTheme()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={onHandleComponentDrawer}
          >
            <Bars3BottomLeftIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Flex Board</a>
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-ghost btn-circle"
          href="https://github.com/gabrielscapim/flex-board"
          target="_blank"
        >
          <img
            src={GitHubIcon}
            alt="Github icon"
          />
        </a>
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input
            type="checkbox"
            className="theme-controller" value="synthwave"
            onChange={theme.handleChange}
          />
          <SunIcon className="swap-off w-6 h-6" />
          <MoonIcon className="swap-on w-6 h-6" />
        </label>
      </div>
    </div>
  )
}
