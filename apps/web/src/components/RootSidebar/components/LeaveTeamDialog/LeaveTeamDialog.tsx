import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { GetTeamResult } from 'types/endpoints'

export type LeaveTeamDialogProps = {
  team?: GetTeamResult
  open?: boolean
  onLeave?: () => void
  onCancel?: () => void
}

export function LeaveTeamDialog (props: LeaveTeamDialogProps) {
  const { team, open, onLeave, onCancel } = props

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to leave the team "{team?.name}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will no longer have access to the team's boards and members.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onLeave}>
            Leave Team
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
