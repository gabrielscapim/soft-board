import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const onboardingTutorial: Tutorial = {
  name: 'onboarding',
  steps: [
    {
      element: getPopoverAnchorSelector('RootSidebar'),
      popover: {
        title: '🧭 Main navigation',
        description:
          'Use this sidebar to access all main areas of the app.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('TeamSwitcher'),
      popover: {
        title: '👥 Team switcher',
        description:
          'Switch between teams or create a new one anytime.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarBoardsItem'),
      popover: {
        title: '🗂️ Boards',
        description:
          'Access and manage all your boards and projects here.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarMembersItem'),
      popover: {
        title: '👤 Team members',
        description:
          'Invite people and manage team access.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarSettingsItem'),
      popover: {
        title: '⚙️ Team settings',
        description:
          'Configure preferences and team-level options.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('NavUser'),
      popover: {
        title: '🙋 Your account',
        description:
          'View your profile, leave the team, or log out.',
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardsRoute'),
      popover: {
        title: '📌 Your boards',
        description:
          'This is where all your boards live.',
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CreateBoardButton'),
      popover: {
        title: '➕ Create a board',
        description:
          'Start something new by creating your first board.',
        side: 'left',
        nextBtnText: 'I created it'
      },
      disableActiveInteraction: false
    },
    {
      popover: {
        title: '🎉 You’re ready',
        description:
          'Open your board and start building your product.',
        side: 'bottom',
        nextBtnText: 'Got it'
      }
    }
  ]
}
