import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { GetBoardsResultData } from 'types/endpoints'
import { FormattedDate } from '@/components'
import clsx from 'clsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { getRootImage } from '@/helpers'

export type BoardCardProps = {
  board: GetBoardsResultData
  hasPermission?: boolean
  handleEdit?: (board: GetBoardsResultData) => void
  handleDelete?: (board: GetBoardsResultData) => void
}

export function BoardCard (props: BoardCardProps) {
  const { board, hasPermission, handleEdit, handleDelete } = props

  return (
    <Card key={board.id} className="overflow-hidden p-0 gap-1">
      <AspectRatio ratio={16 / 9}>
        <img
          src={getRootImage(board.image)}
          alt="Board"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <CardHeader className="flex justify-between items-center pt-3 px-3 pb-0">
        <CardTitle
          className={clsx(!board.title && 'opacity-20')}
        >
          {board.title ?? 'Untitled'}
        </CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <EllipsisVerticalIcon size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={!hasPermission}
                onClick={() => handleEdit?.(board)}
              >
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!hasPermission}
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete?.(board)}
              >
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </CardHeader>
      <CardContent className="px-3 pb-3">
        <span className="text-xs text-muted-foreground">
          Updated at{' '}
          <FormattedDate date={board.updateDate} format="dd/MM/yyyy HH:mm" />
        </span>
      </CardContent>
    </Card>
  )
}
