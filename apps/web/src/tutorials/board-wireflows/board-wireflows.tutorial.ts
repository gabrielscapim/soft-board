import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardWireflowsTutorial: Tutorial = {
  name: 'board-wireflows',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardWireflowsContainer'),
      popover: {
        title: '🧩 Wireflow canvas',
        description:
          'This is where screens and components connect to form user flows.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardZoomController'),
      popover: {
        title: '🔍 Zoom controls',
        description:
          'Zoom in to focus on details or zoom out to see the full journey.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeLink'),
      popover: {
        title: '👀 Preview experience',
        description:
          'Enter preview mode to experience the flow as a real user.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardLink'),
      popover: {
        title: '✏️ Edit mode',
        description:
          'Switch back to editing to add or adjust screens and components.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: '💬 Build with chat',
        description:
          'Create screens and components using simple natural language.',
        side: 'top',
        nextBtnText: 'Got it'
      },
      disableActiveInteraction: true
    }
  ]
}
