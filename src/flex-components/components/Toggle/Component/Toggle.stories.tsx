import { Meta, StoryObj } from '@storybook/react'
import { UUID } from '../../../../types'
import { ToggleFlexComponent } from './Toggle'
import { toggleFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Toggle',
  component: ToggleFlexComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      properties: {
      }
    }
  },
} satisfies Meta<typeof ToggleFlexComponent>


export default meta

type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[0].properties
      }
    }
  }
}

export const Deactivated: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[1].properties
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[2].properties
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[3].properties
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[4].properties
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleFlexComponentSchema.variations[5].properties
      }
    }
  }
}
