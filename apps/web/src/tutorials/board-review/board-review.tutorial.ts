import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardReviewTutorial: Tutorial = {
  name: 'board-review',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardReviewContainer'),
      popover: {
        title: '👀 Review mode',
        description:
          'Explore your board and wireflows in read-only mode to preserve the design.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: '💬 Get a review from chat',
        description:
          'Use the chat to generate a usability review based on proven heuristics.',
        side: 'right'
      },
      disableActiveInteraction: true
    }
  ]
}
