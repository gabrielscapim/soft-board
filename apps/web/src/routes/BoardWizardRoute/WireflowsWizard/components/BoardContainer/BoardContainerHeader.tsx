import { Button } from '@/components/ui/button'
import { Maximize, PlayIcon } from 'lucide-react'

export function BoardContainerHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="size-7"
            variant="outline"
          >
            <Maximize />
          </Button>
          <Button
            size="icon"
            className="size-7"
            variant="outline"
          >
            <PlayIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
