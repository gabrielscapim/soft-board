import { Meta, StoryObj } from '@storybook/react'
import { ButtonFlexComponent } from './Button'
import { buttonFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Button',
  component: ButtonFlexComponent,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <div
        style={{
          height: '44px'
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {
      }
    }
  },
} satisfies Meta<typeof ButtonFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Primary',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[0].properties
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Button',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[1].properties
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1',
      name: 'Button',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[2].properties
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1',
      name: 'Button',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[3].properties
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1',
      name: 'Button',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[4].properties
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1',
      name: 'Button',
      type: 'button',
      properties: {
        absolute: false,
        ...buttonFlexComponentSchema.variations[5].properties
      }
    }
  }
}
