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
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold">Requirements</h1>
          <p className="text-sm text-muted-foreground">
            List and prioritize the main features and user needs for your MVP.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={handleCreate}
        >
          <PlusIcon />
          New requirement
        </Button>
      </div>

      <div className="space-y-3">
        {requirements.map((requirement) => (
          <RequirementCard
            key={requirement.id}
            requirement={requirement}
            loading={loading}
            handleDelete={() => handleDelete?.(requirement)}
            handleEdit={() => handleEdit?.(requirement)}
          />
        ))}
      </div>
    </>
  )
}
