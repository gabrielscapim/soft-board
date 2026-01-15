import { Meta, StoryObj } from '@storybook/react'
import { ToggleSoftComponent } from './Toggle'
import { toggleSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Toggle',
  component: ToggleSoftComponent,
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
} satisfies Meta<typeof ToggleSoftComponent>


export default meta

type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[0].properties
      }
    }
  }
}

export const Deactivated: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[1].properties
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[2].properties
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[3].properties
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[4].properties
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1',
      name: 'Toggle',
      type: 'toggle',
      properties: {
        absolute: false,
        ...toggleSoftComponentSchema.variations[5].properties
      }
    }
  }
}
