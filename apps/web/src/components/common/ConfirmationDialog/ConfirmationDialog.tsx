import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components'
import { useTranslation } from 'react-i18next'

export type ConfirmationDialogProps = {
  open?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmationDialog (props: ConfirmationDialogProps) {
  const {
    open,
    title,
    description,
    confirmLabel,
    cancelLabel,
    isMutating = false,
    onCancel,
    onConfirm
  } = props

  const { t } = useTranslation('components')

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? t('common.confirmationDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>{description ?? t('common.confirmationDialog.description')}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isMutating}
            onClick={() => {
              if (!isMutating) onCancel?.()
            }}
          >
            {cancelLabel ?? t('common.confirmationDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isMutating}
            onClick={onConfirm}
          >
            {confirmLabel ?? t('common.confirmationDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
