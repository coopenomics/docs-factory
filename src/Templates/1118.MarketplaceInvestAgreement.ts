import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.MarketplaceInvestAgreement.registry_id

export type Action = Registry.MarketplaceInvestAgreement.Action

export type Model = Registry.MarketplaceInvestAgreement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    agreement_number: { type: 'string' },
    branch_name: { type: 'string', nullable: true },
  },
  required: ['meta', 'coop', 'vars', 'user', 'agreement_number'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceInvestAgreement.title,
  description: Registry.MarketplaceInvestAgreement.description,
  model: Schema,
  context: Registry.MarketplaceInvestAgreement.context,
  translations: Registry.MarketplaceInvestAgreement.translations,
}
