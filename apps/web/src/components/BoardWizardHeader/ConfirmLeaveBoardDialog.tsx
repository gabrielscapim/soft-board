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

export type ConfirmLeaveBoardDialogProps = {
  open?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmLeaveBoardDialog (props: ConfirmLeaveBoardDialogProps) {
  const { open, onCancel, onConfirm } = props

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to leave this board?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You can rejoin the board later if you change your mind.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
