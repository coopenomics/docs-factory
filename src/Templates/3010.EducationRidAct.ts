import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.EducationRidAct.registry_id

export type Action = Registry.EducationRidAct.Action

export type Model = Registry.EducationRidAct.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    rid_hash: { type: 'string' },
    rid_short_hash: { type: 'string' },
    amount: { type: 'string' },
    rid_type: { type: 'string' },
    contract_number: { type: 'string' },
    contract_created_at: { type: 'string' },
    rid_type_human: { type: 'string' },
    decision_id: { type: 'number', nullable: true },
    decision_date: { type: 'string', nullable: true },
  },
  required: ['contract_number', 'contract_created_at', 'rid_type_human', 'meta', 'coop', 'vars', 'user', 'program', 'rid_hash', 'rid_short_hash', 'amount', 'rid_type'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationRidAct.title,
  description: Registry.EducationRidAct.description,
  model: Schema,
  context: Registry.EducationRidAct.context,
  translations: Registry.EducationRidAct.translations,
}
