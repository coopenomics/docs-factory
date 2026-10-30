import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.CapitalizationPropertyInvestStatement.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationPropertyInvestStatement.Action

// Модель данных
export type Model = Registry.CapitalizationPropertyInvestStatement.Model

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
  title: Registry.CapitalizationPropertyInvestStatement.title,
  description: Registry.CapitalizationPropertyInvestStatement.description,
  model: Schema,
  context: Registry.CapitalizationPropertyInvestStatement.context,
  translations: Registry.CapitalizationPropertyInvestStatement.translations,
}
