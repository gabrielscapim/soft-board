import { Meta, StoryObj } from '@storybook/react'
import { DividerSoftComponent } from './Divider'
import { dividerSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Divider',
  component: DividerSoftComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {
      }
    }
  }
} satisfies Meta<typeof DividerSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Divider',
      type: 'divider',
      properties: {
        ...dividerSoftComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Divider',
      type: 'divider',
      properties: {
        ...dividerSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const Tertiary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Divider',
      type: 'divider',
      properties: {
        ...dividerSoftComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}
