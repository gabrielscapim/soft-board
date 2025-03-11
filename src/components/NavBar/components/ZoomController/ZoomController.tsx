import { MinusIcon, PlusIcon } from 'lucide-react'
import { MIN_SCALE, MAX_SCALE } from '../../../../helpers'
import { useScale } from '../../../../hooks'
import { BoardController, BoardState } from '../../../../lib'

type ZoomControllerProps = {
  boardController: BoardController
  boardState: BoardState
}

export function ZoomController (props: ZoomControllerProps) {
  const { boardController, boardState } = props

  const scale = useScale(boardState)

  return (
    <div className="flex justify-center items-center mr-8 gap-4">
      <button
        className="btn btn-ghost btn-xs btn-square"
        onClick={() => {
          if (scale - 0.25 > MIN_SCALE) {
            boardController.onChangeBoardScale({ scale: scale - 0.25 })
          }
        }}
      >
        <MinusIcon className="w-5 h-5" />
      </button>
      <span className="text-xs">{Math.round(scale * 100)}%</span>
      <button
        className="btn btn-ghost btn-xs btn-square"
        onClick={() => {
          if (scale < MAX_SCALE) {
            boardController.onChangeBoardScale({ scale: scale + 0.25 })
          }
        }}
      >
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
