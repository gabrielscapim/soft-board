import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Spinner } from '@/components/ui/spinner'
import { AlertTriangleIcon, SparklesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GetMessagesResultBoardGeneration } from 'types/endpoints'

export type BoardGenerationItemProps = {
  boardGeneration: GetMessagesResultBoardGeneration
}

const TITLE_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'generation.status.title.completed',
  error: 'generation.status.title.error',
  pending: 'generation.status.title.pending'
}

const MEDIA_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], React.ReactNode> = {
  completed: <SparklesIcon size={16} />,
  error: <AlertTriangleIcon size={16} className="text-destructive" />,
  pending: <Spinner className="size-4" variant="circle" />
}

const DESCRIPTION_BY_STATUS: Record<GetMessagesResultBoardGeneration['status'], string> = {
  completed: 'generation.status.description.completed',
  error: 'generation.status.description.error',
  pending: 'generation.status.description.pending'
}

export function BoardGenerationItem (props: BoardGenerationItemProps) {
  const { boardGeneration } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <Item className="p-0 gap-3">
      {MEDIA_BY_STATUS[boardGeneration.status]}
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-xs">
          {t(TITLE_BY_STATUS[boardGeneration.status])}
        </ItemTitle>
        <ItemDescription className="text-xs">
          {t(DESCRIPTION_BY_STATUS[boardGeneration.status])}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
