import {
  Button,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose
} from '@/components'
import { useTranslation } from 'react-i18next'

export type ConfirmLeaveBoardDialogProps = {
  open?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmLeaveBoardDialog (props: ConfirmLeaveBoardDialogProps) {
  const { open, onCancel, onConfirm } = props

  const { t } = useTranslation('layouts.boardWizard')

  return (
    <Dialog
      open={open}
      onOpenChange={onCancel}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('confirmLeaveBoardDialog.title')}
          </DialogTitle>
          <DialogDescription>
            {t('confirmLeaveBoardDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={onCancel}
              >
                {t('confirmLeaveBoardDialog.cancel')}
              </Button>
            </DialogClose>
            <Button
              onClick={onConfirm}
            >
              {t('confirmLeaveBoardDialog.confirm')}
            </Button>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
