import { Board, BoardProps } from '@/components'

export type BoardContainerProps = BoardProps

export function BoardContainer (props: BoardContainerProps) {
  return (
    <>
      <Board
        {...props}
      />
    </>
  )
}
