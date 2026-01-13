import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardRequirementsTutorial: Tutorial = {
  name: 'board-requirements',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainer'),
      popover: {
        title: 'Requirements panel',
        description:
          'Here you can see, manage, and organize all your product requirements.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainerCreateButton'),
      popover: {
        title: 'Add requirements manually',
        description:
          'Click here to create a requirement yourself whenever you want.',
        side: 'bottom'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'Or just talk to your board 💬',
        description:
          'You can describe features in natural language and your board will turn them into requirements.',
        side: 'top',
        nextBtnText: 'Try it'
      },
      disableActiveInteraction: false
    }
  ]
}
