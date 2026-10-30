import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.MarketplaceWriteoffProtocol.registry_id

export type Action = Registry.MarketplaceWriteoffProtocol.Action

export type Model = Registry.MarketplaceWriteoffProtocol.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    proposal_hash: { type: 'string' },
    cycle_started_at: { type: 'string' },
    total_amount: { type: 'string' },
    items_count: { type: 'number' },
  },
  required: ['meta', 'coop', 'vars', 'decision', 'proposal_hash', 'cycle_started_at', 'total_amount', 'items_count'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceWriteoffProtocol.title,
  description: Registry.MarketplaceWriteoffProtocol.description,
  model: Schema,
  context: Registry.MarketplaceWriteoffProtocol.context,
  translations: Registry.MarketplaceWriteoffProtocol.translations,
}
