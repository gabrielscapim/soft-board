import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { GetBoardsResultData } from 'types/endpoints'
import loginImage from '../../../../public/sign-in-image.png'
import { FormattedDate } from '@/components'
import clsx from 'clsx'

export type BoardCardProps = {
  board: GetBoardsResultData
}

export function BoardCard (props: BoardCardProps) {
  const { board } = props

  return (
    <Card key={board.id} className="overflow-hidden p-0 gap-1">
      <AspectRatio ratio={16 / 9}>
        <img
          src={loginImage}
          alt="Board"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <CardHeader
        className={clsx(
          'pt-3',
          'px-3',
          'pb-0',
          !board.title && 'text-muted-foreground fon'
        )}
      >
        <CardTitle>
          {board.title ?? 'Untitled'}
        </CardTitle>
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
