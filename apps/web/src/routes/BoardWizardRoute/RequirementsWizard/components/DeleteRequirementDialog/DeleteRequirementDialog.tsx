import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useTranslation } from 'react-i18next'

export type DeleteRequirementDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function DeleteRequirementDialog (props: DeleteRequirementDialogProps) {
  const { open, isMutating, onConfirm, onCancel } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('deleteRequirementDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('deleteRequirementDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isMutating}
            onClick={onCancel}
          >
            {t('deleteRequirementDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isMutating}
            onClick={onConfirm}
          >
            {t('deleteRequirementDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
