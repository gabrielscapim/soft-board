import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getRootImage } from '@/helpers'
import { GetBoardResult } from 'types/endpoints'

export type ChatContainerHeaderProps = {
  board: GetBoardResult
}

export function ChatContainerHeader (props: ChatContainerHeaderProps) {
  const { board } = props

  return (
    <div className="flex items-center gap-2 p-3 border-b">
      <Avatar>
        <AvatarImage src={getRootImage(board?.image)} />
      </Avatar>
      <span className="text-sm font-medium">
        {board?.title ?? <span className="opacity-30">Untitled Board</span>}
      </span>
    </div>
  )
}
