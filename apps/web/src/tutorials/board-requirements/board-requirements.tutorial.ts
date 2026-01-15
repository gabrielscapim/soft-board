import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardRequirementsTutorial: Tutorial = {
  name: 'board-requirements',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainer'),
      popover: {
        title: '📝 Requirements overview',
        description:
          'View, organize, and manage all the requirements for your product.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainerCreateButton'),
      popover: {
        title: '➕ Add a requirement',
        description:
          'Create a new requirement manually whenever you need.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: '💬 Describe it in words',
        description:
          'Explain features in natural language and let your board turn them into requirements.',
        side: 'top',
        nextBtnText: 'Try it'
      },
      disableActiveInteraction: true
    }
  ]
}
