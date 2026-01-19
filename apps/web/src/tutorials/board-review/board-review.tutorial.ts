import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardReviewTutorial: Tutorial = {
  name: 'board-review',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardReviewContainer'),
      popover: {
        title: 'boardReview.reviewMode.title',
        description: 'boardReview.reviewMode.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'boardReview.chatInput.title',
        description: 'boardReview.chatInput.description',
        side: 'right'
      },
      disableActiveInteraction: true
    }
  ]
}
