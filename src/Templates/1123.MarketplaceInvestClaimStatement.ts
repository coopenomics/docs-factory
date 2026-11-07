import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.MarketplaceInvestClaimStatement.registry_id

export type Action = Registry.MarketplaceInvestClaimStatement.Action

export type Model = Registry.MarketplaceInvestClaimStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    claim_hash: { type: 'string' },
    branch_name: { type: 'string' },
    amount: { type: 'string' },
    agreement_number: { type: 'string' },
    agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'claim_hash', 'branch_name', 'amount', 'agreement_number', 'agreement_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceInvestClaimStatement.title,
  description: Registry.MarketplaceInvestClaimStatement.description,
  model: Schema,
  context: Registry.MarketplaceInvestClaimStatement.context,
  translations: Registry.MarketplaceInvestClaimStatement.translations,
}
