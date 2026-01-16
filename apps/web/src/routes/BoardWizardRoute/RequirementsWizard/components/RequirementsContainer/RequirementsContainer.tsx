import { Button } from '@/components/ui/button'
import { GetRequirementsResultData } from 'types/endpoints'
import { RequirementCard } from '../RequirementCard'
import { PlusIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { useTranslation } from 'react-i18next'

export type RequirementsContainerProps = {
  hasPermission?: boolean
  requirements?: GetRequirementsResultData[]
  loading?: boolean
  handleCreate?: () => void
  handleDelete?: (requirement: GetRequirementsResultData) => void
  handleEdit?: (requirement: GetRequirementsResultData) => void
}

export function RequirementsContainer (props: RequirementsContainerProps) {
  const {
    hasPermission,
    requirements = [],
    loading,
    handleCreate,
    handleDelete,
    handleEdit
  } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <div data-tutorial={TUTORIALS_ANCHORS.BoardWizardRequirementsContainer}>
      <div className="mb-4 flex flex-row justify-between items-center">
        <div>
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-md font-semibold">{t('common:requirements')}</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-tutorial={TUTORIALS_ANCHORS.BoardWizardRequirementsContainerCreateButton}
                  variant="outline"
                  className="size-7"
                  size="icon"
                  disabled={loading || hasPermission === false}
                  onClick={handleCreate}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {t('actions.addRequirement')}
              </TooltipContent>
            </Tooltip>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('requirementsList.description')}
          </p>
        </div>
      </div>

      <div className="gap-2 flex flex-col">
        {requirements.map((requirement) => (
          <RequirementCard
            key={requirement.id}
            hasPermission={hasPermission}
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
            disabled={loading || hasPermission === false}
            onClick={handleCreate}
          >
            <PlusIcon className="mr-2" />
            {t('actions.addFirstRequirement')}
          </Button>
        )}
      </div>
    </div>
  )
}
