import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const onboardingTutorial: Tutorial = {
  name: 'onboarding',
  steps: [
    {
      element: getPopoverAnchorSelector('RootSidebar'),
      popover: {
        title: 'Main navigation',
        description:
          'This sidebar helps you move around the app and access all the main sections.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('TeamSwitcher'),
      popover: {
        title: 'Switch teams',
        description:
          'Working with multiple teams? Use this to quickly switch between them or create a new one.',
        side: 'bottom'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('RootSidebarBoardsItem'),
      popover: {
        title: 'Boards',
        description:
          'This is where you’ll find and manage all your boards and projects.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarMembersItem'),
      popover: {
        title: 'Team members',
        description:
          'Invite new people and manage who has access to your team.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarSettingsItem'),
      popover: {
        title: 'Team settings',
        description:
          'Manage your team’s preferences and configurations here.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('NavUser'),
      popover: {
        title: 'Your account',
        description:
          'Access your profile info, leave the team, or log out.',
        side: 'top'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardsRoute'),
      popover: {
        title: 'Your boards',
        description:
          'This is the main area where all your boards are displayed.',
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CreateBoardButton'),
      popover: {
        title: 'Create your first board',
        description:
          'Click here to create a new board and get things started.',
        side: 'left',
        nextBtnText: 'I created it'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardCard'),
      popover: {
        title: 'All set! 🎉',
        description:
          'Nice! Now click on your new board to jump in and start working.',
        side: 'bottom',
        nextBtnText: 'Got it'
      }
    }
  ]
}
