import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export function InvalidBoardStepState () {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">
            The board is not in wireflows step
          </h1>

          <p className="text-muted-foreground">
            Please switch the board to wireflows step to edit wireflows.
          </p>

          <Button asChild className="mt-2" variant="outline">
            <Link to=".." relative="path">
              Go back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
