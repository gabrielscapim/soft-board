import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams } from 'react-router'
import { useClient, useSelectedBoard } from '@/hooks'

export function BoardWizardFooter () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board, refetch } = useSelectedBoard(boardId)
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
    <footer className="flex justify-between p-4">
      {
        <Button
          variant="outline"
          onClick={() => handlePrevious.mutate()}
          disabled={handlePrevious.isPending || handleNext.isPending || previousDisabled}
        >
          <ChevronLeft />
          Back
        </Button>
      }
      <Button
        onClick={() => handleNext.mutate()}
        disabled={handleNext.isPending || handlePrevious.isPending}
      >
        Next
        <ChevronRight />
      </Button>
    </footer>
  )
}
