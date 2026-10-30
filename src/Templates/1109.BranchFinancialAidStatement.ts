import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.BranchFinancialAidStatement.registry_id

export type Action = Registry.BranchFinancialAidStatement.Action

export type Model = Registry.BranchFinancialAidStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    aid_hash: { type: 'string' },
    braname: { type: 'string' },
    amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'aid_hash', 'braname', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchFinancialAidStatement.title,
  description: Registry.BranchFinancialAidStatement.description,
  model: Schema,
  context: Registry.BranchFinancialAidStatement.context,
  translations: Registry.BranchFinancialAidStatement.translations,
}
