import type { JSONSchemaType } from 'ajv'
import type { IIntellectualResult } from '@coopenomics/docs-templates'

export const IntellectualResultSchema: JSONSchemaType<IIntellectualResult> = {
  type: 'object',
  properties: {
    quantity: { type: 'number' },
    name: { type: 'string' },
    currency: { type: 'string' },
    unit_price: { type: 'number' },
    total_price: { type: 'number' },
    description: { type: 'string' },
  },
  required: ['quantity', 'name', 'currency', 'unit_price', 'total_price', 'description'],
  additionalProperties: true,
}
