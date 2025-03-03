import GitHubIcon from '../../public/github-icon.svg'
import { useScale, useTheme } from '../../hooks'
import { BoardController, BoardState } from '../../lib'
import { MAX_SCALE, MIN_SCALE } from '../../helpers'
import { MinusIcon, MoonIcon, PlusIcon, SunIcon } from 'lucide-react'

export type NavBarProps = {
  boardController: BoardController
  boardState: BoardState
}

export function NavBar (props: NavBarProps) {
  const theme = useTheme()
  const scale = useScale(props.boardState)

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start" />
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Flex Board</a>
      </div>
      <div className="navbar-end">
        <div className="flex justify-center items-center mr-8 gap-4">
          <button
            className="btn btn-ghost btn-xs btn-square"
            onClick={() => {
              if (scale - 0.25 > MIN_SCALE) {
                props.boardController.onChangeBoardScale({ scale: scale - 0.25 })}
              }
            }
          >
            <MinusIcon className="w-5 h-5" />
          </button>
          <span className="text-xs">{Math.round(scale * 100)}%</span>
          <button
            className="btn btn-ghost btn-xs btn-square"
            onClick={() => {
              if (scale < MAX_SCALE) {
                props.boardController.onChangeBoardScale({ scale: scale + 0.25 })}
              }
            }
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
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
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm ml-2">
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
