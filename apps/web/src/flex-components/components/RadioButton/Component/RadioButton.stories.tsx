import { Meta, StoryObj } from '@storybook/react'
import { RadioButtonSoftComponent } from './RadioButton'
import { radioButtonSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Radio Button',
  component: RadioButtonSoftComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof RadioButtonSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Deactivated: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1',
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonSoftComponentSchema.variations[5].properties,
        absolute: false
      }
    }
  }
}
