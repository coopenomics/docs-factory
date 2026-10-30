import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'

export const registry_id = Registry.MarketplaceProgramTemplate.registry_id

// Положение о ЦПП «Стол заказов».
// Эпик 1 — первый документ онбординга, утверждается Советом до шаблона оферты
// (1102.MarketplaceOffer, совет утверждает его бланк). Аналог 998.BlagorostProgramTemplate в Капитале.
export type Action = Registry.MarketplaceProgramTemplate.Action

export type Model = Registry.MarketplaceProgramTemplate.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceProgramTemplate.title,
  description: Registry.MarketplaceProgramTemplate.description,
  model: Schema,
  context: Registry.MarketplaceProgramTemplate.context,
  translations: Registry.MarketplaceProgramTemplate.translations,
}
