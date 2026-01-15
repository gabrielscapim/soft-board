import { Meta, StoryObj } from '@storybook/react'
import { ShapeSoftComponent } from './Shape'
import { shapeSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Shape',
  component: ShapeSoftComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ShapeSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const Tertiary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const Unfilled: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const Circle: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}

export const Rectangle: Story = {
  args: {
    component: {
      id: '1',
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeSoftComponentSchema.variations[5].properties,
        absolute: false
      }
    }
  }
}
