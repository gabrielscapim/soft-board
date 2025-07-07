import { FlexComponentType } from '../../types'
import { FlexComponentSchema } from '../types'
import {
  buttonFlexComponentSchema,
  dividerFlexComponentSchema,
  iconFlexComponentSchema,
  inputFlexComponentSchema,
  mobileScreenFlexComponentSchema,
  radioButtonFlexComponentSchema,
  shapeFlexComponentSchema,
  textFlexComponentSchema,
  toggleFlexComponentSchema
} from '../components'

export const FLEX_COMPONENTS_SCHEMAS: Record<FlexComponentType, FlexComponentSchema> = {
  button: buttonFlexComponentSchema,
  divider: dividerFlexComponentSchema,
  icon: iconFlexComponentSchema,
  input: inputFlexComponentSchema,
  mobileScreen: mobileScreenFlexComponentSchema,
  radioButton: radioButtonFlexComponentSchema,
  shape: shapeFlexComponentSchema,
  text: textFlexComponentSchema,
  toggle: toggleFlexComponentSchema
}
