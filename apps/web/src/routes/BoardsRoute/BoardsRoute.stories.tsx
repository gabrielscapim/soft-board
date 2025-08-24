import { Meta, StoryObj } from '@storybook/react'
import { BoardsRoute } from './BoardsRoute'
import { Client } from '@/client'
import { ClientProvider } from '@/contexts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const meta = {
  title: 'Routes/Team Boards',
  component: BoardsRoute,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story, context) => {
      const client = new Client()
      const queryClient = new QueryClient()

      const variant = context.parameters.variant

      client.getBoards = () => {
        switch (variant) {
          case 'loading':
            return new Promise(() => {})
          case 'error':
            return Promise.reject(new globalThis.Error('Failed to fetch boards'))
          case 'empty':
            return Promise.resolve({ data: [] })
          default:
            return Promise.resolve({
              data: [
                {
                  id: 'board-1',
                  title: 'Board 1',
                  updateDate: new Date().toISOString(),
                  createDate: new Date().toISOString(),
                  teamId: 'team-1'
                },
                {
                  id: 'board-2',
                  title: 'Board 2',
                  updateDate: new Date().toISOString(),
                  createDate: new Date().toISOString(),
                  teamId: 'team-1'
                }
              ]
            })
        }
      }

      return (
        <QueryClientProvider client={queryClient}>
          <ClientProvider client={client}>
            <Story />
          </ClientProvider>
        </QueryClientProvider>
      )
    }
  ],
  tags: ['autodocs']
} satisfies Meta<typeof BoardsRoute>

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  parameters: {
    variant: 'success'
  }
}

export const Loading: Story = {
  parameters: {
    variant: 'loading'
  }
}

export const Error: Story = {
  parameters: {
    variant: 'error'
  }
}

export const Empty: Story = {
  parameters: {
    variant: 'empty'
  }
}
