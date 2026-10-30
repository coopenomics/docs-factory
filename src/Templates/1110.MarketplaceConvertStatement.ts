import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceConvertStatement.registry_id

export type Action = Registry.MarketplaceConvertStatement.Action

export type Model = Registry.MarketplaceConvertStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    order_hash: { type: 'string' },
    amount: { type: 'string' },
    membership_fee: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'program', 'order_hash', 'amount', 'membership_fee'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceConvertStatement.title,
  description: Registry.MarketplaceConvertStatement.description,
  model: Schema,
  context: Registry.MarketplaceConvertStatement.context,
  translations: Registry.MarketplaceConvertStatement.translations,
}
