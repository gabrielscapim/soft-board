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

export type DeleteBoardDialogProps = {
  open?: boolean
  onDelete?: () => void
  onCancel?: () => void
}

export function DeleteBoardDialog (props: DeleteBoardDialogProps) {
  const { open, onDelete, onCancel } = props

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this board?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the board and all its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
