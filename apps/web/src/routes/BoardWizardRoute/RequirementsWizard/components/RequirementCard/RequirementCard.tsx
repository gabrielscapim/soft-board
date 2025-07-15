import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { GetRequirementsResultData } from 'types/endpoints'

export type RequirementCardProps = {
  requirement: GetRequirementsResultData
  loading?: boolean
  handleDelete?: () => void
  handleEdit?: () => void
}

export function RequirementCard (props: RequirementCardProps) {
  const { requirement, loading, handleDelete, handleEdit } = props

  return (
    <Card id={requirement.id} className="py-4 shadow-none group w-full">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">
          {requirement.title ? requirement.title : <span className="opacity-30">Untitled</span>}
        </CardTitle>
        <CardDescription className="text-xs">
          {requirement.description ? requirement.description : <span className="opacity-30">No description provided</span>}
        </CardDescription>
        <CardAction className="flex gap-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={loading}
            onClick={handleEdit}
          >
            <PencilIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={loading}
            onClick={handleDelete}
          >
            <TrashIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

