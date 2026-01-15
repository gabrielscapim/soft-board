import { SquareMousePointer } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components'

export type BoardLinkProps = {
  to: string
}

export function BoardLink (props: BoardLinkProps) {
  const { to } = props

  return (
    <Link to={to} relative="path">
      <Button
        size="sm"
        variant="outline"
      >
        <SquareMousePointer />
        Board
      </Button>
    </Link>
  )
}
