import { Meta, StoryObj } from '@storybook/react'
import { InputSoftComponent } from './Input'
import { inputSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Input',
  component: InputSoftComponent,
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
} satisfies Meta<typeof InputSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Secondary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const Tertiary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[5].properties,
        absolute: false
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[6].properties,
        absolute: false
      }
    }
  }
}

export const Icon: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[7].properties,
        absolute: false
      }
    }
  }
}

export const Dropdown: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputSoftComponentSchema.variations[8].properties,
        absolute: false
      }
    }
  }
}
