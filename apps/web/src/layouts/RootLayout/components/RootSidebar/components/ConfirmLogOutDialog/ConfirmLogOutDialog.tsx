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

export type ConfirmLogOutDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmLogOutDialog (props: ConfirmLogOutDialogProps) {
  const { open, isMutating, onCancel, onConfirm } = props

  const { t }  = useTranslation('layouts.rootLayout')

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('confirmLogOutDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('confirmLogOutDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isMutating}
              onClick={() => {
                if (!isMutating) {
                  onCancel?.()
                }
              }}
            >
              {t('confirmLogOutDialog.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isMutating}
              onClick={onConfirm}
            >
              {t('confirmLogOutDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
