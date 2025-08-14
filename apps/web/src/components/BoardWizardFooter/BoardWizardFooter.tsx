import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams } from 'react-router'
import { useClient, useBoard } from '@/hooks'

export function BoardWizardFooter () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board, refetch } = useBoard()
  const client = useClient()
  const currentStep = board?.step

  const handleNext = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'next' }),
    onSuccess: () => refetch(),
    onError: () => toast.error('Failed to update board step')
  })
  const handlePrevious = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'previous' }),
    onSuccess: () => refetch(),
    onError: () => toast.error('Failed to update board step')
  })

  const previousDisabled = currentStep === 'requirements'

  return (
    <footer className="flex justify-between py-4 px-4">
      <Button
        size="lg"
        variant="link"
        disabled={handlePrevious.isPending || handleNext.isPending || previousDisabled}
        onClick={() => handlePrevious.mutate()}
      >
        Back
      </Button>
      <Button
      size="lg"
        disabled={handleNext.isPending || handlePrevious.isPending}
        onClick={() => handleNext.mutate()}
      >
        Next
      </Button>
    </footer>
  )
}
