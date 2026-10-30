import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.EducationRidStatement.registry_id

export type Action = Registry.EducationRidStatement.Action

export type Model = Registry.EducationRidStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    rid_hash: { type: 'string' },
    assignment_id: { type: 'number' },
    amount: { type: 'string' },
    rid_type: { type: 'string' },
    links: { type: 'array', items: { type: 'string' } },
    contract_number: { type: 'string' },
    contract_created_at: { type: 'string' },
    rid_type_human: { type: 'string' },
    rid_short_hash: { type: 'string' },
  },
  required: ['contract_number', 'contract_created_at', 'rid_type_human', 'rid_short_hash', 'meta', 'coop', 'vars', 'user', 'program', 'rid_hash', 'assignment_id', 'amount', 'rid_type', 'links'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationRidStatement.title,
  description: Registry.EducationRidStatement.description,
  model: Schema,
  context: Registry.EducationRidStatement.context,
  translations: Registry.EducationRidStatement.translations,
}
