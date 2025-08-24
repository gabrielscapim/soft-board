import { Meta, StoryObj } from '@storybook/react'
import { InputFlexComponent } from './Input'
import { inputFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Input',
  component: InputFlexComponent,
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
} satisfies Meta<typeof InputFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    component: {
      id: '1',
      name: 'Input',
      type: 'input',
      properties: {
        ...inputFlexComponentSchema.variations[0].properties,
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
        ...inputFlexComponentSchema.variations[1].properties,
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
        ...inputFlexComponentSchema.variations[2].properties,
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
        ...inputFlexComponentSchema.variations[3].properties,
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
        ...inputFlexComponentSchema.variations[4].properties,
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
        ...inputFlexComponentSchema.variations[5].properties,
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
        ...inputFlexComponentSchema.variations[6].properties,
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
        ...inputFlexComponentSchema.variations[7].properties,
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
        ...inputFlexComponentSchema.variations[8].properties,
        absolute: false
      }
    }
  }
}
