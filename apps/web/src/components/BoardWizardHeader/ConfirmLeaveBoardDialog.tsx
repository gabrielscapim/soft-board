import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

export type ConfirmLeaveBoardDialogProps = {
  open?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function ConfirmLeaveBoardDialog (props: ConfirmLeaveBoardDialogProps) {
  const { open, onCancel, onConfirm } = props

  return (
    <Dialog
      open={open}
      onOpenChange={onCancel}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to leave this board?
          </DialogTitle>
          <DialogDescription>
            You can rejoin the board later if you change your mind.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onConfirm}
            >
              Leave
            </Button>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
