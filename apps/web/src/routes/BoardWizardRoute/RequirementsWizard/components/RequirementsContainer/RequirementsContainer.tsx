import { Button } from '@/components/ui/button'
import { GetRequirementsResultData } from 'types/endpoints'
import { RequirementCard } from '../RequirementCard'
import { PlusIcon } from 'lucide-react'

export type RequirementsContainerProps = {
  requirements?: GetRequirementsResultData[]
  loading?: boolean
  handleCreate?: () => void
  handleDelete?: (requirement: GetRequirementsResultData) => void
  handleEdit?: (requirement: GetRequirementsResultData) => void
}

export function RequirementsContainer (props: RequirementsContainerProps) {
  const {
    requirements = [],
    loading,
    handleCreate,
    handleDelete,
    handleEdit,
  } = props

  return (
    <>
      <div className="mb-4 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-md font-semibold">Requirements</h1>
          <p className="text-xs text-muted-foreground">
            List and prioritize the main features and user needs for your MVP.
          </p>
        </div>
        <Button
          variant="outline"
          className="size-7"
          size="icon"
          disabled={loading}
          onClick={handleCreate}
        >
          <PlusIcon />
        </Button>
      </div>

      <div className="gap-2 flex flex-col">
        {requirements.map((requirement) => (
          <RequirementCard
            key={requirement.id}
            requirement={requirement}
            loading={loading}
            handleDelete={() => handleDelete?.(requirement)}
            handleEdit={() => handleEdit?.(requirement)}
          />
        ))}

        {!requirements.length && (
          <Button
            variant="outline"
            className="mt-1 w-fit"
            size="sm"
            disabled={loading}
            onClick={handleCreate}
          >
            <PlusIcon className="mr-2" />
            Add your first requirement
          </Button>
        )}
      </div>
    </>
  )
}
