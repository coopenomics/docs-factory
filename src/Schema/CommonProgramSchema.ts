import type { JSONSchemaType } from 'ajv'
import type { ICommonProgram } from '@coopenomics/docs-templates'

export const CommonProgramSchema: JSONSchemaType<ICommonProgram> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: true,
}
