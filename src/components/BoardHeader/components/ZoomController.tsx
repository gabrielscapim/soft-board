import { Button } from '@/components/ui/button'
import { MIN_SCALE, MAX_SCALE } from '@/helpers'
import { useBoard, useScale } from '@/hooks'
import { MinusIcon, PlusIcon } from 'lucide-react'

export function ZoomController () {
  const { boardState, boardController } = useBoard()

  const scale = useScale(boardState)

  return (
    <div className="flex justify-center items-center mr-8 gap-3">
      <Button
        size="icon"
        className="size-6"
        variant="outline"
        onClick={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
      >
        <MinusIcon size={16} />
      </Button>
      <span className="text-xs">{Math.round(scale * 100)}%</span>
      <Button
        size="icon"
        className="size-6"
        variant="outline"
        onClick={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  )
}
