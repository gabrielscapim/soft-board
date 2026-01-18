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

export type DeleteMemberDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function DeleteMemberDialog (props: DeleteMemberDialogProps) {
  const { open, isMutating, onConfirm, onCancel } = props

  const { t } = useTranslation('routes.members')

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('deleteMemberDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('deleteMemberDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isMutating}
            onClick={onCancel}
          >
            {t('deleteMemberDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isMutating}
            onClick={onConfirm}
          >
            {t('deleteMemberDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
