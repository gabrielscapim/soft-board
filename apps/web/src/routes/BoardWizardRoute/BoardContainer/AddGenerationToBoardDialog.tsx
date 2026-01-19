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

export type AddGenerationToBoardDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function AddGenerationToBoardDialog (props: AddGenerationToBoardDialogProps) {
  const { open, isMutating, onCancel, onConfirm } = props

  const { t } = useTranslation('routes.boardWizard')

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('addGenerationDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('addGenerationDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isMutating}
            onClick={onCancel}
          >
            {t('addGenerationDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isMutating}
            onClick={onConfirm}
          >
            {t('addGenerationDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
