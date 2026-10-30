import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'

export const registry_id = Registry.MarketplaceOffer.registry_id

// Инстанс публичной оферты ЦПП «Стол заказов» для конкретного пайщика.
// Эпик 1 / Story 1.11 (L2 onboarding) + Story 1.4 (L3 fallback gate). Подписывается
// пайщиком через wallet::signagree (program_id=2 «marketplace», draft_id=1100).
export type Action = Registry.MarketplaceOffer.Action

export type Model = Registry.MarketplaceOffer.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    marketplace_agreement_number: { type: 'string' },
    marketplace_agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'marketplace_agreement_number', 'marketplace_agreement_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceOffer.title,
  description: Registry.MarketplaceOffer.description,
  model: Schema,
  context: Registry.MarketplaceOffer.context,
  translations: Registry.MarketplaceOffer.translations,
}
