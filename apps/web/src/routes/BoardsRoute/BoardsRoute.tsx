import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { BoardsGrid, DeleteBoardDialog, EditBoardDialog } from './components'
import { useClient, useMemberRole } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { GetBoardsResultData } from 'types/endpoints'
import { TUTORIALS_ANCHORS, useTutorial } from '@/tutorials'
import { ConfirmationDialog } from '@/components'
import { useTranslation } from 'react-i18next'
import { Client } from '@/client/client'

export function BoardsRoute () {
  const client = useClient()
  const memberRole = useMemberRole()
  const tutorial = useTutorial('onboarding')
  const { t } = useTranslation('routes.boards')

  const [selectedBoard, setSelectedBoard] = useState<(GetBoardsResultData & { to: 'edit' | 'delete' }) | null>(null)
  const getBoards = useQuery({
    queryKey: ['getBoards'],
    queryFn: async () => await client.getBoards({ })
  })
  const createBoard = useMutation({
    mutationFn: () => client.createBoard({}),
    onSuccess: () => {
      getBoards.refetch()
      toast.success(t('toast.createSuccess'))
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.createError'))
    }
  })
  const deleteBoard = useMutation({
    mutationFn: () => client.deleteBoard({ id: selectedBoard!.id }),
    onSuccess: () => {
      getBoards.refetch()
      setSelectedBoard(null)
      toast.success(t('toast.deleteSuccess'))
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.deleteError'))
    }
  })
  const editBoard = useMutation({
    mutationFn: (title: string) => client.updateBoard({ id: selectedBoard!.id, title }),
    onSuccess: () => {
      getBoards.refetch()
      setSelectedBoard(null)
      toast.success(t('toast.updateSuccess'))
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.updateError'))
    }
  })
  const boards = getBoards.data?.data ?? []

  return (
    <div
      className="py-4 w-full px-8"
      data-tutorial={TUTORIALS_ANCHORS.BoardsRoute}
    >
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <Button
          data-tutorial={TUTORIALS_ANCHORS.CreateBoardButton}
          variant="outline"
          size="sm"
          disabled={createBoard.isPending || memberRole === 'member'}
          onClick={() => createBoard.mutate()}
        >
          <PlusIcon />
          {t('actions.newBoard')}
        </Button>
      </div>

      <BoardsGrid
        hasPermission={['owner', 'admin'].includes(memberRole ?? '')}
        loading={getBoards.isPending}
        boards={boards}
        handleEdit={board => setSelectedBoard({ ...board, to: 'edit' })}
        handleDelete={board => setSelectedBoard({ ...board, to: 'delete' })}
      />

      {getBoards.error && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-1">
            {t('errors.loadTitle')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t('errors.loadDescription')}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={getBoards.isPending}
            onClick={() => getBoards.refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      {!getBoards.isPending && !getBoards.isError && boards.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-1">
            {t('emptyState.title')}
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            {t('emptyState.description')}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={createBoard.isPending || memberRole === 'member'}
            onClick={() => createBoard.mutate()}
          >
            <PlusIcon />
            {t('actions.newBoard')}
          </Button>
        </div>
      )}

      {selectedBoard?.to === 'delete' && (
        <DeleteBoardDialog
          open={selectedBoard?.to === 'delete'}
          isMutating={deleteBoard.isPending}
          onCancel={() => setSelectedBoard(null)}
          onConfirm={() => deleteBoard.mutate()}
        />
      )}

      {selectedBoard?.to === 'edit' && (
        <EditBoardDialog
          board={selectedBoard ?? null}
          open={selectedBoard?.to === 'edit'}
          isMutating={editBoard.isPending}
          onCancel={() => setSelectedBoard(null)}
          onConfirm={title => editBoard.mutate(title)}
        />
      )}

      <ConfirmationDialog
        title={t('tutorialDialog.title')}
        description={t('tutorialDialog.description')}
        confirmLabel={t('tutorialDialog.confirm')}
        cancelLabel={t('tutorialDialog.cancel')}
        open={!tutorial.isRunning && tutorial.state.allowed === null}
        onCancel={() => tutorial.onChange('allowed', false)}
        onConfirm={() => tutorial.onChange('allowed', true)}
      />
    </div>
  )
}
