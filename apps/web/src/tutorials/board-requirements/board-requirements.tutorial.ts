import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardRequirementsTutorial: Tutorial = {
  name: 'board-requirements',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainer'),
      popover: {
        title: 'boardRequirements.requirementsList.title',
        description: 'boardRequirements.requirementsList.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainerCreateButton'),
      popover: {
        title: 'boardRequirements.addRequirementButton.title',
        description: 'boardRequirements.addRequirementButton.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'boardRequirements.chatInput.title',
        description: 'boardRequirements.chatInput.description',
        side: 'top'
      },
      disableActiveInteraction: true
    }
  ]
}
