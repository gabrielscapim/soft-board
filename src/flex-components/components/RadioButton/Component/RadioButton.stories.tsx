import { Meta, StoryObj } from '@storybook/react'
import { UUID } from '../../../../types'
import { RadioButtonFlexComponent } from './RadioButton'
import { radioButtonFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Radio Button',
  component: RadioButtonFlexComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof RadioButtonFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Activated: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const Deactivated: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const ExtraSmall: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const Small: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const Medium: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}

export const Large: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Radio Button',
      type: 'radioButton',
      properties: {
        ...radioButtonFlexComponentSchema.variations[5].properties,
        absolute: false
      }
    }
  }
}
