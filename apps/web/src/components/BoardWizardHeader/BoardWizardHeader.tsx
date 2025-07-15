import { useClient, useSelectedBoard } from '@/hooks'
import { Link, useParams } from 'react-router'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Stepper } from '../Stepper'

export function BoardWizardHeader () {
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

  return (
    <header className="flex flex-row items-center sticky top-0 shrink-0 p-2 z-50 bg-muted">
      <div className="w-1/5 flex justify-start">
        {(currentStep === 'init' || currentStep === 'requirements') && (
          <Link
            to={`/${board?.team.slug ?? ''}/boards`}
            className="flex items-center gap-2 font-medium"
          >
            <Button variant="outline">
              <ChevronLeft />
              Boards
            </Button>
          </Link>
        )}

        {(currentStep === 'wireflows' || currentStep === 'review') && (
          <Button
            variant="outline"
            onClick={() => handlePrevious.mutate()}
            disabled={handlePrevious.isPending || handleNext.isPending}
          >
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>

      <div className="w-3/5 flex justify-center">
        <Stepper
          steps={[
            { label: 'Requirements', state: 'requirements' },
            { label: 'Wireflows', state: 'wireflows' },
            { label: 'Review', state: 'review' }
          ]}
          currentStep={currentStep}
        />
      </div>

      <div className="w-1/5 flex justify-end">
        {currentStep !== 'review' && (
          <Button
            variant="outline"
            onClick={() => handleNext.mutate()}
            disabled={handleNext.isPending || handlePrevious.isPending}
          >
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
    </header>
  )
}
