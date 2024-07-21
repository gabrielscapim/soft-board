import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import GitHubIcon from '../../public/github-icon.svg'

export type NavBarProps = {
  onHandleComponentDrawer?: () => void
}

export function NavBar (props: NavBarProps) {
  const { onHandleComponentDrawer } = props

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
        <a className="btn btn-ghost text-xl">FlexBoard</a>
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
      </div>
    </div>
  )
}
