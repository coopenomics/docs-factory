import type { JSONSchemaType } from 'ajv'
import type { IContributionAmount } from '@coopenomics/docs-templates'

export const ContributionAmountSchema: JSONSchemaType<IContributionAmount> = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    currency: { type: 'string' },
    words: { type: 'string' },
  },
  required: ['amount', 'currency', 'words'],
  additionalProperties: true,
}
