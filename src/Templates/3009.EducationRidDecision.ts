import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.EducationRidDecision.registry_id

export type Action = Registry.EducationRidDecision.Action

export type Model = Registry.EducationRidDecision.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    rid_hash: { type: 'string' },
    amount: { type: 'string' },
    contract_number: { type: 'string' },
    contract_created_at: { type: 'string' },
    rid_type_human: { type: 'string' },
    rid_short_hash: { type: 'string' },
  },
  required: ['contract_number', 'contract_created_at', 'rid_type_human', 'rid_short_hash', 'meta', 'coop', 'vars', 'decision', 'user', 'program', 'rid_hash', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationRidDecision.title,
  description: Registry.EducationRidDecision.description,
  model: Schema,
  context: Registry.EducationRidDecision.context,
  translations: Registry.EducationRidDecision.translations,
}
