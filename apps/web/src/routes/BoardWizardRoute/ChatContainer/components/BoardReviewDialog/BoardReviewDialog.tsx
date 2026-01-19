import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetMessagesResultBoardReview } from 'types/endpoints'
import { OverallScore, ReviewCard } from './components'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SparklesIcon, AlertTriangleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type BoardReviewDialogProps = {
  boardReview: GetMessagesResultBoardReview
  onClose?: () => void
}

const DATA_BY_STATUS: Record<GetMessagesResultBoardReview['status'], { title: string, media: React.ReactNode, description: string }> = {
  completed: {
    title: 'review.status.completed.title',
    media: <SparklesIcon size={16} />,
    description: 'review.status.completed.description'
  },
  error: {
    title: 'review.status.error.title',
    media: <AlertTriangleIcon size={16} className="text-destructive" />,
    description: 'review.status.error.description'
  },
  pending: {
    title: 'review.status.pending.title',
    media: <Spinner className="size-4" variant="circle" />,
    description: 'review.status.pending.description'
  }
}

export function BoardReviewDialog (props: BoardReviewDialogProps) {
  const { boardReview } = props

  const data = DATA_BY_STATUS[boardReview.status]

  const { t } = useTranslation('routes.boardWizard')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Item className="p-0 gap-3">
          {data.media}
          <ItemContent>
            <ItemTitle className="line-clamp-1 text-xs">
              {t(data.title)}
            </ItemTitle>
            <ItemDescription className="text-xs">
              {t(data.description)}
            </ItemDescription>
          </ItemContent>
        </Item>
      </DialogTrigger>

      {boardReview.status === 'completed' && (
        <DialogContentWrapper {...props} />
      )}
    </Dialog>
  )
}

function DialogContentWrapper (props: BoardReviewDialogProps) {
  const {
    boardReview,
    onClose
  } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <DialogContent className="max-w-[95vw] w-full sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[1200px] max-h-[90vh] h-auto">
      <DialogHeader>
        <DialogTitle>{t('boardReview.title')}</DialogTitle>
        <DialogDescription>
          {t('boardReview.description', { count: boardReview.review?.length ?? 0 })}
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[calc(90vh-156px)] pr-4">
        <OverallScore score={boardReview.score ?? 0.01} />
        <div className="mt-6 space-y-4">
          {boardReview.review?.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
            />
          ))}
        </div>
      </ScrollArea>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={onClose}>
            {t('common:close')}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
