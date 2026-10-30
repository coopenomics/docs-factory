import type { JSONSchemaType } from 'ajv'
import type { IUHDContract } from '@coopenomics/docs-templates'

export const UHDContractSchema: JSONSchemaType<IUHDContract> = {
  type: 'object',
  properties: {
    number: { type: 'string' },
    date: { type: 'string' },
  },
  required: ['number', 'date'],
  additionalProperties: true,
}
