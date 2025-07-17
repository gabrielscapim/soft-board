import { StoryObj } from '@storybook/react'
import { BoardPropertiesMenu } from './BoardPropertiesMenu'
import { BoardController, BoardState } from '@/lib'

const meta = {
  title: 'Board route/Board Properties Menu',
  component: BoardPropertiesMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {},
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const boardState = new BoardState()
const boardController = new BoardController(boardState)

export const Example: Story = {
  args: {
    boardState,
    boardController,
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
