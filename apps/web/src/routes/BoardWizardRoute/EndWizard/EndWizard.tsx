import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { ShareBoardDialog } from './components'
import { useBoard, useClient } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

export function EndWizard () {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [sharedLink, setSharedLink] = useState<string | null>(null)
  const { board } = useBoard()
  const client = useClient()

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
      <h1 className="text-5xl font-bold">End of the Board</h1>

      <p className="text-md text-muted-foreground">
        Thank you for completing all the steps of the <strong>StartFlow</strong> method!
      </p>

      <Button
        variant="outline"
        disabled={getSharedBoardByBoardId.isPending || getSharedBoardByBoardId.isError}
        onClick={() => setShareDialogOpen(true)}
      >
        {getSharedBoardByBoardId.isPending ? <Spinner variant="circle" /> : <ExternalLink />}
        Share board
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

