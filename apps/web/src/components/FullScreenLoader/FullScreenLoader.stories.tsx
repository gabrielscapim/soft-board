import { Meta, StoryObj } from '@storybook/react'
import { FullScreenLoader } from './FullScreenLoader'

const meta = {
  title: 'Components/Full Screen Loader',
  component: FullScreenLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullScreenLoader>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {},
}
