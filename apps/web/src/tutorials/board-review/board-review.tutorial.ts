import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardReviewTutorial: Tutorial = {
  name: 'board-review',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardReviewContainer'),
      popover: {
        title: 'Review your board',
        // cannot update only see
        description: 'In review mode, you can explore the board and its wireflows, but editing is disabled to maintain the integrity of the design.',
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'Generate a review',
        description: 'Use the chat to generate a comprehensive review of your board based on established usability heuristics.',
        side: 'right'
      },
      disableActiveInteraction: false
    }
  ]
}
