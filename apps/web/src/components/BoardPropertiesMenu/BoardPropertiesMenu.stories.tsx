import { StoryObj } from '@storybook/react'
import { BoardPropertiesMenu } from './BoardPropertiesMenu'

const meta = {
  title: 'Board route/Board Properties Menu',
  component: BoardPropertiesMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {}
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    boardState: {} as any,
    boardController: {} as any,
    flexComponents: [
      {
        id: '1',
        type: 'button',
        name: 'Button 1',
        properties: {
          x: 0,
          y: 0,
          width: 800,
          height: 600
        }
      }
    ],
    className: 'static',
    selectedFlexComponents: [
      {
        id: '1',
        type: 'button',
        name: 'Button 1',
        properties: {
          x: 0,
          y: 0,
          width: 800,
          height: 600
        }
      }
    ]
  }
}
