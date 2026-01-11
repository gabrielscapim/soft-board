import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export type SharedBoardErrorContainerProps = {
  isNotFound?: boolean
}

export function SharedBoardErrorContainer (props: SharedBoardErrorContainerProps) {
  const { isNotFound } = props

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <h2 className="text-lg font-semibold">
        {isNotFound ? 'Board not found' : 'Failed to load board'}
      </h2>

      <p className="text-xs text-muted-foreground">
        {isNotFound
          ? 'The board you are trying to access does not exist or has been removed.'
          : 'There was an error fetching the board'}
      </p>

      <div className="flex gap-2">
        <Link to="/">
          <Button
            size="sm"
            variant="outline"
          >
            Return
          </Button>
        </Link>
      </div>
    </div>
  )
}
