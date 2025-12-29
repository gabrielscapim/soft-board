import { Meta, StoryObj } from '@storybook/react'
import { ChatContainer } from './ChatContainer'

const meta = {
  title: 'Board route/Chat container',
  component: ChatContainer,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => (
      <div
        className="text-sm"
      >
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
} satisfies Meta<typeof ChatContainer>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    board: {
      id: '1',
      team: {} as any,
      title: 'Board',
      step: 'init',
      status: 'idle',
      image: '1',
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      components: [],
      generation: null
    },
    authenticatedUser: {
      userId: '1',
      name: 'User',
      email: 'email',
      fallbackTeam: null
    },
    messages: [
      {
        id: '1',
        boardId: '1',
        author: null,
        content: 'Hello! I’m your assistant specialized in the StartFlow method, here to help software startups design MVPs quickly, visually, and with a strong focus on user experience.',
        role: 'assistant',
        toolCallId: null,
        toolCalled: false,
        boardGeneration: null,
        sendDate: new Date().toISOString(),
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: '2',
        boardId: '1',
        author: {
          userId: '1',
          name: 'User'
        },
        content: 'Hello! Create a drink water app for me.',
        role: 'user',
        toolCallId: null,
        toolCalled: false,
        boardGeneration: null,
        sendDate: new Date().toISOString(),
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      },
      {
        id: '3',
        boardId: '1',
        author: null,
        content: 'Sure! I will create.',
        role: 'assistant',
        toolCallId: null,
        toolCalled: false,
        boardGeneration: null,
        sendDate: new Date().toISOString(),
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      }
    ]
  }
}
