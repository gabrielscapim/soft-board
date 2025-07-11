import { FormattedDate } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PencilIcon, TrashIcon, CalendarIcon } from 'lucide-react'
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
    <Card id={requirement.id} className="gap-5">
      <CardHeader>
        <CardTitle>
          {requirement.title ? requirement.title : <span className="opacity-30">Untitled</span>}
        </CardTitle>
        <CardDescription>
          {requirement.description ? requirement.description : <span className="opacity-30">No description provided</span>}
        </CardDescription>
        <CardAction className="ml-3">
          <Button
            variant="outline"
            size="icon"
            className="size-8 mr-2"
            disabled={loading}
            onClick={handleEdit}
          >
            <PencilIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={loading}
            onClick={handleDelete}
          >
            <TrashIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <CalendarIcon size={16} />
          <span className="text-xs text-muted-foreground">
            Updated{' '}
            <FormattedDate
              date={requirement.updateDate}
              format="dd/MM/yyyy HH:mm"
            />
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
