import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'

export type BoardZoomControllerProps = {
  scale?: number
  onZoomIn?: () => void
  onZoomOut?: () => void
}

export function BoardZoomController (props: BoardZoomControllerProps) {
  const { scale = 1, onZoomIn, onZoomOut } = props

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        size="icon"
        className="size-7"
        variant="outline"
        onClick={() => onZoomOut?.()}
      >
        <MinusIcon />
      </Button>
      <span className="text-xs">{Math.round(scale * 100)}%</span>
      <Button
        size="icon"
        className="size-7"
        variant="outline"
        onClick={() => onZoomIn?.()}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
