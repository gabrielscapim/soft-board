import { SoftComponentType } from '../../types'
import { SoftComponentSchema } from '../types'
import {
  buttonSoftComponentSchema,
  dividerSoftComponentSchema,
  iconSoftComponentSchema,
  inputSoftComponentSchema,
  mobileScreenSoftComponentSchema,
  radioButtonSoftComponentSchema,
  shapeSoftComponentSchema,
  textSoftComponentSchema,
  toggleSoftComponentSchema
} from '../components'

export const SOFT_COMPONENTS_SCHEMAS: Record<SoftComponentType, SoftComponentSchema> = {
  button: buttonSoftComponentSchema,
  divider: dividerSoftComponentSchema,
  icon: iconSoftComponentSchema,
  input: inputSoftComponentSchema,
  mobileScreen: mobileScreenSoftComponentSchema,
  radioButton: radioButtonSoftComponentSchema,
  shape: shapeSoftComponentSchema,
  text: textSoftComponentSchema,
  toggle: toggleSoftComponentSchema
}
