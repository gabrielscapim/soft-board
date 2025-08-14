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

export type ConfirmLogOutDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmLogOutDialog (props: ConfirmLogOutDialogProps) {
  const { open, isMutating, onCancel, onConfirm } = props

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to log out?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account and redirected to the login page.
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
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isMutating}
              onClick={onConfirm}
            >
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
