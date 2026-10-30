import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.BranchFinancialAidProtocol.registry_id

export type Action = Registry.BranchFinancialAidProtocol.Action

export type Model = Registry.BranchFinancialAidProtocol.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    aid_hash: { type: 'string' },
    receiver: CommonUserSchema,
    braname: { type: 'string' },
    amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'decision', 'aid_hash', 'receiver', 'braname', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchFinancialAidProtocol.title,
  description: Registry.BranchFinancialAidProtocol.description,
  model: Schema,
  context: Registry.BranchFinancialAidProtocol.context,
  translations: Registry.BranchFinancialAidProtocol.translations,
}
