import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Spinner } from '@/components/ui/spinner'
import { AlertTriangleIcon, CheckCircle2Icon } from 'lucide-react'
import { GetMessagesResultBoardGeneration } from 'types/endpoints'

export type BoardGenerationItemProps = {
  boardGeneration: GetMessagesResultBoardGeneration
}

const TITLE_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'Wireframe created',
  error: 'Error when creating wireframe',
  pending: 'Creating wireframe...'
}

const MEDIA_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], React.ReactNode> = {
  completed: <CheckCircle2Icon size={16} />,
  error: <AlertTriangleIcon size={16} className="text-destructive" />,
  pending: <Spinner className="size-4" variant="circle" />
}

const DESCRIPTION_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'You can click to view your new wireframe.',
  error: 'There was an error while creating the wireframe.',
  pending: 'Your wireframe is being created. This may take a few moments.'
}

export function BoardGenerationItem (props: BoardGenerationItemProps) {
  const { boardGeneration } = props

  return (
    <Item className="p-0 gap-2">
      <ItemMedia variant="icon" className="border-none">
        {MEDIA_BY_STATUS[boardGeneration.status]}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-xs">
          {TITLE_BY_STATUS[boardGeneration.status]}
        </ItemTitle>
        <ItemDescription className="text-xs">
          {DESCRIPTION_BY_STATUS[boardGeneration.status]}
        </ItemDescription>
      </ItemContent>
      {boardGeneration.status === 'completed' && (
        <ItemActions>
          <Button variant="outline" size="xs" className="text-xs">
            Open
          </Button>
        </ItemActions>
      )}
    </Item>
  )
}
