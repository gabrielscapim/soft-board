import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react'

export type BoardCardDropdownProps = {
  hasPermission?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function BoardCardDropdown (props: BoardCardDropdownProps) {
  const { hasPermission, onEdit, onDelete } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVerticalIcon size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={!hasPermission}
            onClick={(event) => {
              event.stopPropagation()
              onEdit?.()
            }}
          >
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!hasPermission}
            className="text-destructive focus:text-destructive"
            onClick={(event) => {
              event.stopPropagation()
              onDelete?.()
            }}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
