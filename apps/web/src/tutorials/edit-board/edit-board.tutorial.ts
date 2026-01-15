import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const editBoardTutorial: Tutorial = {
  name: 'edit-board',
  steps: [
    {
      element: getPopoverAnchorSelector('Board'),
      popover: {
        title: '🧩 Board canvas',
        description:
          'Drag, resize, and position components freely on your board.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardHeaderAddScreenButton'),
      popover: {
        title: '📱 Add a screen',
        description:
          'Click here to add a new mobile screen to your board.',
        side: 'bottom',
        onNextClick: async (element, _step, { driver }) => {
          const button = element as HTMLElement

          button.focus()
          button.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CollapsibleEditBoardSidebar'),
      popover: {
        title: '🗂️ Component library',
        description:
          'Browse all available components you can add to your board.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardComponentCardPreview'),
      popover: {
        title: '➕ Add a component',
        description:
          'Click a component to instantly place it on the canvas.',
        side: 'right',
        onNextClick: async (element, _step, { driver }) => {
          const card = element as HTMLElement

          card.focus()
          card.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: '⚙️ Component settings',
        description:
          'Customize the selected component’s properties here.',
        side: 'left',
        onNextClick: async (_element, _step, { driver }) => {
          const actionsTabTrigger = document.querySelector(
            getPopoverAnchorSelector('BoardPropertiesMenuActionsTab')
          ) as HTMLElement

          actionsTabTrigger.focus()
          actionsTabTrigger.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: '🔗 Actions & navigation',
        description:
          'Define interactions and connect screens for preview mode.',
        side: 'bottom',
        onNextClick: async (_element, _step, { driver }) => {
          // Press "esc"
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    }
  ]
}
