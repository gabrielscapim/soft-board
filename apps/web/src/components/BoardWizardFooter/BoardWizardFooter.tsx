import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams } from 'react-router'
import { useClient, useBoard, useMemberRole } from '@/hooks'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export function BoardWizardFooter () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board, refetch, refetchWithQuery } = useBoard()
  const client = useClient()
  const memberRole = useMemberRole()
  const currentStep = board?.step

  const handleNext = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'next' }),
    onSuccess: () => onHandleStep(),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to update board step')
  })
  const handlePrevious = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'previous' }),
    onSuccess: () => onHandleStep(),
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to update board step')
  })

  const onHandleStep = () => {
    if (board?.generation?.id) {
      refetchWithQuery({ boardId: boardId!, boardGenerationId: null })
    } else {
      refetch()
    }
  }

  return (
    <footer
      data-tutorial={TUTORIALS_ANCHORS.BoardWizardFooter}
      className="flex justify-between py-4 px-4"
    >
      {currentStep && currentStep !== 'init' && (
        <Button
          size="lg"
          variant="link"
          disabled={handlePrevious.isPending || handleNext.isPending || memberRole === 'member'}
          onClick={() => handlePrevious.mutate()}
        >
          {currentStep === 'requirements' && 'Back'}
          {currentStep === 'wireflows' && 'Back'}
          {currentStep === 'review' && 'Back'}
          {currentStep === 'end' && 'Back'}
        </Button>
      )}
      {currentStep && currentStep !== 'end' && (
        <Button
          data-tutorial={TUTORIALS_ANCHORS.BoardWizardFooterNextStepButton}
          size="lg"
          className="ml-auto"
          disabled={handleNext.isPending || handlePrevious.isPending || memberRole === 'member'}
          onClick={() => handleNext.mutate()}
        >
          {currentStep === 'init' && 'Start'}
          {currentStep === 'requirements' && 'Next'}
          {currentStep === 'wireflows' && 'Next'}
          {currentStep === 'review' && 'Complete'}
        </Button>
      )}
    </footer>
  )
}
