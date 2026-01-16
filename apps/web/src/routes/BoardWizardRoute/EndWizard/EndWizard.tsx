import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { ShareBoardDialog } from './components'
import { useBoard, useClient, useMemberRole } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useTranslation } from 'react-i18next'

export function EndWizard () {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [sharedLink, setSharedLink] = useState<string | null>(null)
  const { board } = useBoard()
  const client = useClient()
  const memberRole = useMemberRole()
  const { t } = useTranslation('routes.boardWizard')

  const getSharedBoardByBoardId = useQuery({
    queryKey: ['getSharedBoardByBoardId', { boardId: board?.id }],
    queryFn: async () => {
      const result = await client.getSharedBoardByBoardId({ boardId: board!.id })
      setSharedLink(result.link)
      return result
    },
    enabled: Boolean(board?.id)
  })

  const shareBoard = useMutation({
    mutationFn: () => client.shareBoard({ boardId: board!.id }),
    onSuccess: (result) => setSharedLink(result.link),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to share board')
  })

  return (
    <div className="w-full flex flex-col items-center justify-center h-full gap-8">
      <h1 className="text-5xl font-bold">{t('endWizard.title')}</h1>

      <p className="text-md text-muted-foreground">
        {t('endWizard.description')}
      </p>

      <Button
        variant="outline"
        disabled={getSharedBoardByBoardId.isPending || getSharedBoardByBoardId.isError || memberRole === 'member'}
        onClick={() => setShareDialogOpen(true)}
      >
        {getSharedBoardByBoardId.isPending ? <Spinner variant="circle" /> : <ExternalLink />}
        {t('actions.shareBoard')}
      </Button>

      <ShareBoardDialog
        open={shareDialogOpen}
        sharedLink={sharedLink}
        isMutating={shareBoard.isPending}
        onClose={() => setShareDialogOpen(false)}
        onShare={() => shareBoard.mutate()}
      />
    </div>
  )
}

