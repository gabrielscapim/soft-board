import { Link } from 'react-router'
import { Button } from '../ui/button'
import { SquareMousePointer } from 'lucide-react'

export function WireframeModeHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 border-b p-2 flex justify-end">
      <Link to="/" className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="text-xs">
          <SquareMousePointer size={16} />
          Return to Board
        </Button>
      </Link>
    </header>
  )
}
