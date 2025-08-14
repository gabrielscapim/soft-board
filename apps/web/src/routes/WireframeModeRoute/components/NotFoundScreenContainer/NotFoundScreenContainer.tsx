import { Button } from '@/components/ui/button'
import { SquareMousePointerIcon } from 'lucide-react'
import { Link } from 'react-router'

export function NotFoundScreenContainer () {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        No screens found
      </h1>
      <p className="text-muted-foreground">
        Please add a screen to the board to enter wireframe mode.
      </p>
      <Link to=".." relative="path">
        <Button variant="outline">
          <SquareMousePointerIcon />
          Back to Board
        </Button>
      </Link>
    </div>
  )
}
