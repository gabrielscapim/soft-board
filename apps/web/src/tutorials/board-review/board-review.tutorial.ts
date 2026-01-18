import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const boardReviewTutorial: Tutorial = {
  name: 'board-review',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardReviewContainer'),
      popover: {
        title: t('boardReview.reviewMode.title', { ns: 'tutorial' }),
        description: t('boardReview.reviewMode.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: t('boardReview.chatInput.title', { ns: 'tutorial' }),
        description: t('boardReview.chatInput.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    }
  ]
}
