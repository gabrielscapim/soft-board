import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GetRequirementsResultData } from 'types/endpoints'

export type RequirementCardProps = {
  requirement: GetRequirementsResultData
  hasPermission?: boolean
  loading?: boolean
  handleDelete?: () => void
  handleEdit?: () => void
}

export function RequirementCard (props: RequirementCardProps) {
  const { requirement, hasPermission, loading, handleDelete, handleEdit } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <Card id={requirement.id} className="py-4 shadow-none group w-full">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">
          {requirement.title ? requirement.title : <span className="opacity-30">{t('common:untitled')}</span>}
        </CardTitle>
        <CardDescription className="text-xs">
          {requirement.description ? requirement.description : <span className="opacity-30">{t('requirementCard:emptyDescription')}</span>}
        </CardDescription>
        <CardAction className="flex gap-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={loading || hasPermission === false}
            onClick={handleEdit}
          >
            <PencilIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-destructive focus:text-destructive hover:text-destructive"
            disabled={loading || hasPermission === false}
            onClick={handleDelete}
          >
            <TrashIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

