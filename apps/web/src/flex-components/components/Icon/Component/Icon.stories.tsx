import { Meta, StoryObj } from '@storybook/react'
import { IconFlexComponent } from './Icon'
import { iconFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Icon',
  component: IconFlexComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {}
    }
  }
} satisfies Meta<typeof IconFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Icon',
      type: 'icon',
      properties: {
        ...iconFlexComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Icon',
      type: 'icon',
      properties: {
        ...iconFlexComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}
