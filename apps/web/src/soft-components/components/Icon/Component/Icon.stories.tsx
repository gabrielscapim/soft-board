import { Meta, StoryObj } from '@storybook/react'
import { IconSoftComponent } from './Icon'
import { iconSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Icon',
  component: IconSoftComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {}
    }
  }
} satisfies Meta<typeof IconSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Icon',
      type: 'icon',
      properties: {
        ...iconSoftComponentSchema.variations[0].properties,
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
        ...iconSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}
