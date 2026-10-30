import type { JSONSchemaType } from 'ajv'
import type { IFirstLastMiddleName } from '@coopenomics/docs-templates'

export const FirstLastMiddleNameSchema: JSONSchemaType<IFirstLastMiddleName> = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    middle_name: { type: 'string' },
  },
  required: ['first_name', 'last_name', 'middle_name'],
  additionalProperties: true,
}
