import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.CapitalizationPropertyInvestDecision.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationPropertyInvestDecision.Action

// Модель данных
export type Model = Registry.CapitalizationPropertyInvestDecision.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
  },
  required: ['meta'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.CapitalizationPropertyInvestDecision.title,
  description: Registry.CapitalizationPropertyInvestDecision.description,
  model: Schema,
  context: Registry.CapitalizationPropertyInvestDecision.context,
  translations: Registry.CapitalizationPropertyInvestDecision.translations,
}
