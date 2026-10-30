import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.GenerationPropertyInvestDecision.registry_id

// Модель действия для генерации
export type Action = Registry.GenerationPropertyInvestDecision.Action

// Модель данных
export type Model = Registry.GenerationPropertyInvestDecision.Model

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
  title: Registry.GenerationPropertyInvestDecision.title,
  description: Registry.GenerationPropertyInvestDecision.description,
  model: Schema,
  context: Registry.GenerationPropertyInvestDecision.context,
  translations: Registry.GenerationPropertyInvestDecision.translations,
}
