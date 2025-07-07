import { Meta, StoryObj } from '@storybook/react'
import { UUID } from '../../../../types'
import { ShapeFlexComponent } from './Shape'
import { shapeFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Shape',
  component: ShapeFlexComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ShapeFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const Tertiary: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const Unfilled: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const Circle: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}

export const Rectangle: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Shape',
      type: 'shape',
      properties: {
        ...shapeFlexComponentSchema.variations[5].properties,
        absolute: false
      }
    }
  }
}
