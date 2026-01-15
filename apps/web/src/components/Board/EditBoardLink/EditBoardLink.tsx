import { Button } from '@/components'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { PencilIcon } from 'lucide-react'
import { Link } from 'react-router'

export type EditBoardLinkProps = {
  to: string
}

export function EditBoardLink (props: EditBoardLinkProps) {
  const { to } = props

  return (
    <Link
      data-tutorial={TUTORIALS_ANCHORS.EditBoardLink}
      to={to}
      relative="path"
    >
      <Button
        size="sm"
        variant="outline"
      >
        <PencilIcon />
        Edit
      </Button>
    </Link>
  )
}
