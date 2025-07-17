import { Button } from '@/components/ui/button'
import { MIN_SCALE, MAX_SCALE } from '@/helpers'
import { useBoardContext, useScale } from '@/hooks'
import { MinusIcon, PlusIcon } from 'lucide-react'

export function ZoomController () {
  const { boardState, boardController } = useBoardContext()

  const scale = useScale(boardState)

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        size="icon"
        className="size-7"
        variant="outline"
        onClick={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
      >
        <MinusIcon />
      </Button>
      <span className="text-xs">{Math.round(scale * 100)}%</span>
      <Button
        size="icon"
        className="size-7"
        variant="outline"
        onClick={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
