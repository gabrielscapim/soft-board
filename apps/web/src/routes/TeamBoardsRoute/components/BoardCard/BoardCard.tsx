import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { GetBoardsResultData } from 'types/endpoints'
import loginImage from '../../../../public/sign-in-image.png'
import { FormattedDate } from '@/components'

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
      <CardHeader className="pt-3 px-3 pb-0">
        <CardTitle>{board.title}</CardTitle>
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
