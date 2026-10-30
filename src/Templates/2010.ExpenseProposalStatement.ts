import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import {
  CommonUserSchema,
  CooperativeSchema,
  ExpenseProposalHeaderSchema,
  ExpenseRenderItemSchema,
  VarsSchema,
} from '../Schema'

export const registry_id = Registry.ExpenseProposalStatement.registry_id

export type Action = Registry.ExpenseProposalStatement.Action
export type Model = Registry.ExpenseProposalStatement.Model
export type PrivateData = Registry.ExpenseProposalStatement.PrivateData

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    user: CommonUserSchema,
    vars: VarsSchema,
    proposal_hash: { type: 'string' },
    proposal_short_hash: { type: 'string' },
    proposal: ExpenseProposalHeaderSchema,
    items: {
      type: 'array',
      items: ExpenseRenderItemSchema,
    },
  },
  required: ['meta', 'coop', 'user', 'vars', 'proposal_hash', 'proposal_short_hash', 'proposal', 'items'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ExpenseProposalStatement.title,
  description: Registry.ExpenseProposalStatement.description,
  model: Schema,
  context: Registry.ExpenseProposalStatement.context,
  translations: Registry.ExpenseProposalStatement.translations,
}
