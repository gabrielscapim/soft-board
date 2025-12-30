import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Spinner } from '@/components/ui/spinner'
import { AlertTriangleIcon, SparklesIcon } from 'lucide-react'
import { GetMessagesResultBoardGeneration } from 'types/endpoints'

export type BoardGenerationItemProps = {
  boardGeneration: GetMessagesResultBoardGeneration
}

const TITLE_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'Wireflow created',
  error: 'Error when creating wireflow',
  pending: 'Creating wireflow...'
}

const MEDIA_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], React.ReactNode> = {
  completed: <SparklesIcon size={16} />,
  error: <AlertTriangleIcon size={16} className="text-destructive" />,
  pending: <Spinner className="size-4" variant="circle" />
}

const DESCRIPTION_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'You can click to view your new wireflow.',
  error: 'There was an error while creating the wireflow.',
  pending: 'Your wireflow is being created.'
}

export function BoardGenerationItem (props: BoardGenerationItemProps) {
  const { boardGeneration } = props

  return (
    <Item className="p-0 gap-3">
      {MEDIA_BY_STATUS[boardGeneration.status]}
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-xs">
          {TITLE_BY_STATUS[boardGeneration.status]}
        </ItemTitle>
        <ItemDescription className="text-xs">
          {DESCRIPTION_BY_STATUS[boardGeneration.status]}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
