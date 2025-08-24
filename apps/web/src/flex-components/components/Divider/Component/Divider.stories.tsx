import { Meta, StoryObj } from '@storybook/react'
import { DividerFlexComponent } from './Divider'
import { dividerFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Divider',
  component: DividerFlexComponent,
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
} satisfies Meta<typeof DividerFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Divider',
      type: 'divider',
      properties: {
        ...dividerFlexComponentSchema.variations[0].properties,
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
        ...dividerFlexComponentSchema.variations[1].properties,
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
        ...dividerFlexComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}
