import { Meta, StoryObj } from '@storybook/react'
import { TextSoftComponent } from './Text'
import { textSoftComponentSchema } from '../schema'

const meta = {
  title: 'Soft components/Primitive/Text',
  component: TextSoftComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TextSoftComponent>

export default meta

type Story = StoryObj<typeof meta>

export const LargeTitle: Story = {
  args: {
    component: {
      id: '1',
      name: 'Text',
      type: 'text',
      properties: {
        ...textSoftComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const MediumTitle: Story = {
  args: {
    component: {
      id: '1',
      name: 'Text',
      type: 'text',
      properties: {
        ...textSoftComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const SmallTitle: Story = {
  args: {
    component: {
      id: '1',
      name: 'Text',
      type: 'text',
      properties: {
        ...textSoftComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const RegularText: Story = {
  args: {
    component: {
      id: '1',
      name: 'Text',
      type: 'text',
      properties: {
        ...textSoftComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const SmallText: Story = {
  args: {
    component: {
      id: '1',
      name: 'Text',
      type: 'text',
      properties: {
        ...textSoftComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}
