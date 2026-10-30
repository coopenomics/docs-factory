import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceWriteoffStatement.registry_id

export type Action = Registry.MarketplaceWriteoffStatement.Action

export type Model = Registry.MarketplaceWriteoffStatement.Model

const WriteoffItemSchema: JSONSchemaType<Registry.MarketplaceWriteoffStatement.WriteoffItemModel> = {
  type: 'object',
  properties: {
    braname: { type: 'string' },
    asset_title: { type: 'string' },
    quantity: { type: 'string' },
    unit: { type: 'string' },
    amount: { type: 'string' },
    reason: { type: 'string' },
  },
  required: ['braname', 'asset_title', 'quantity', 'unit', 'amount', 'reason'],
  additionalProperties: true,
}

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    chairman: CommonUserSchema,
    program: CommonProgramSchema,
    proposal_hash: { type: 'string' },
    cycle_started_at: { type: 'string' },
    items: { type: 'array', items: WriteoffItemSchema, minItems: 1 },
    total_amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'chairman', 'program', 'proposal_hash', 'cycle_started_at', 'items', 'total_amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceWriteoffStatement.title,
  description: Registry.MarketplaceWriteoffStatement.description,
  model: Schema,
  context: Registry.MarketplaceWriteoffStatement.context,
  translations: Registry.MarketplaceWriteoffStatement.translations,
}
