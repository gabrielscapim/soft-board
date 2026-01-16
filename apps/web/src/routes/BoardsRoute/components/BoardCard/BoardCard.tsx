import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { GetBoardsResultData } from 'types/endpoints'
import { FormattedDate } from '@/components'
import clsx from 'clsx'
import { getRootImage } from '@/helpers'
import { Link } from 'react-router'
import { BoardCardDropdown } from './BoardCardDropdown'
import { useTranslation } from 'react-i18next'

export type BoardCardProps = {
  board: GetBoardsResultData
  hasPermission?: boolean
  handleEdit?: (board: GetBoardsResultData) => void
  handleDelete?: (board: GetBoardsResultData) => void
}

export function BoardCard (props: BoardCardProps) {
  const { board, hasPermission, handleEdit, handleDelete } = props

  const { t } = useTranslation('common')

  return (
    <Card
      key={board.id}
      className="overflow-hidden p-0 gap-1 cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
    >
      <Link to={`${board.id}`}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={getRootImage(board.image)}
            alt="Board"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <CardHeader className="flex justify-between items-center pt-3 px-3 pb-0">
          <CardTitle
            className={clsx(
              !board.title && 'opacity-20',
              'font-normal truncate overflow-hidden text-ellipsis whitespace-nowrap pb-1'
            )}
          >
            {board.title ?? t('untitled')}
          </CardTitle>

          <BoardCardDropdown
            hasPermission={hasPermission}
            onEdit={() => handleEdit?.(board)}
            onDelete={() => handleDelete?.(board)}
          />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <span className="text-xs text-muted-foreground">
            {t('updated')}{' '}
            <FormattedDate
              date={board.updateDate}
              format="dd/MM/yyyy HH:mm"
            />
          </span>
        </CardContent>
      </Link>
    </Card>
  )
}
