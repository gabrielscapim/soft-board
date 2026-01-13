import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardWireflowsTutorial: Tutorial = {
  name: 'board-wireflows',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardWireflowsContainer'),
      popover: {
        title: 'Your wireflow canvas',
        description:
          'This is where your components and screens come together to form user flows.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardZoomController'),
      popover: {
        title: 'Zoom in and out',
        description:
          'Use zoom controls to focus on details or see the full user journey.',
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('PreviewModeLink'),
      popover: {
        title: 'Preview mode 👀',
        description:
          'Test your wireflows in preview mode to experience the user journey firsthand.',
        side: 'bottom'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('EditBoardLink'),
      popover: {
        title: 'Edit your board ✏️',
        description:
          'Edit mode lets you add and modify wireflow components as needed.',
        side: 'bottom'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'Wants a hand? 💬',
        description: 'Talk to your board to create screens and components using natural language.',
        side: 'top',
        nextBtnText: 'Got it'
      },
      disableActiveInteraction: false
    }
  ]
}
