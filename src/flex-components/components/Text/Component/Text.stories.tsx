import { Meta, StoryObj } from '@storybook/react'
import { TextFlexComponent } from './Text'
import { UUID } from '../../../../types'
import { textFlexComponentSchema } from '../schema'

const meta = {
  title: 'Flex components/Primitive/Text',
  component: TextFlexComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TextFlexComponent>

export default meta

type Story = StoryObj<typeof meta>

export const LargeTitle: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Text',
      type: 'text',
      properties: {
        ...textFlexComponentSchema.variations[0].properties,
        absolute: false
      }
    }
  }
}

export const MediumTitle: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Text',
      type: 'text',
      properties: {
        ...textFlexComponentSchema.variations[1].properties,
        absolute: false
      }
    }
  }
}

export const SmallTitle: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Text',
      type: 'text',
      properties: {
        ...textFlexComponentSchema.variations[2].properties,
        absolute: false
      }
    }
  }
}

export const RegularText: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Text',
      type: 'text',
      properties: {
        ...textFlexComponentSchema.variations[3].properties,
        absolute: false
      }
    }
  }
}

export const SmallText: Story = {
  args: {
    component: {
      id: '1' as UUID,
      name: 'Text',
      type: 'text',
      properties: {
        ...textFlexComponentSchema.variations[4].properties,
        absolute: false
      }
    }
  }
}
