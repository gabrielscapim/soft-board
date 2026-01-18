import { Button } from '@/components'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams } from 'react-router'
import { useClient, useBoard, useMemberRole } from '@/hooks'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { useTranslation } from 'react-i18next'
import { Client } from '@/client'

export function BoardWizardFooter () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board, refetch, refetchWithQuery } = useBoard()
  const client = useClient()
  const memberRole = useMemberRole()
  const { t } = useTranslation('layouts.boardWizard')
  const currentStep = board?.step

  const handleNext = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'next' }),
    onSuccess: () => onHandleStep(),
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.updateBoardError'))
    }
  })
  const handlePrevious = useMutation({
    mutationFn: async () => client.updateBoardStep({ id: boardId!, step: 'previous' }),
    onSuccess: () => onHandleStep(),
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.updateBoardError'))
    }
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
          {currentStep === 'requirements' && t('footer.back')}
          {currentStep === 'wireflows' && t('footer.back')}
          {currentStep === 'review' && t('footer.back')}
          {currentStep === 'end' && t('footer.back')}
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
          {currentStep === 'init' && t('footer.start')}
          {currentStep === 'requirements' && t('footer.next')}
          {currentStep === 'wireflows' && t('footer.next')}
          {currentStep === 'review' && t('footer.complete')}
        </Button>
      )}
    </footer>
  )
}
