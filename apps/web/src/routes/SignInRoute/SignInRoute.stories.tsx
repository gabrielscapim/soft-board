import { Meta, StoryObj } from '@storybook/react'
import { SignInRoute } from './SignInRoute'
import { MemoryRouter } from 'react-router'

const meta = {
  title: 'Routes/Sign In',
  component: SignInRoute,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SignInRoute>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
