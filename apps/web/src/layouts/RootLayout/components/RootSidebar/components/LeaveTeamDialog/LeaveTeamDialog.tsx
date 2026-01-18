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
import { GetTeamResult } from 'types/endpoints'

export type LeaveTeamDialogProps = {
  team?: GetTeamResult
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function LeaveTeamDialog (props: LeaveTeamDialogProps) {
  const {
    team,
    open,
    isMutating,
    onCancel,
    onConfirm
  } = props

  const { t } = useTranslation('layouts.rootLayout')

  return (
    <AlertDialog
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('leaveTeamDialog.title', { teamName: team?.name })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('leaveTeamDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isMutating}
            onClick={onCancel}
          >
            {t('leaveTeamDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isMutating}
            onClick={onConfirm}
          >
            {t('leaveTeamDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
