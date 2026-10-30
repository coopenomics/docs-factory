import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.GenerationPropertyInvestStatement.registry_id

// Модель действия для генерации
export type Action = Registry.GenerationPropertyInvestStatement.Action

// Модель данных
export type Model = Registry.GenerationPropertyInvestStatement.Model

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
  title: Registry.GenerationPropertyInvestStatement.title,
  description: Registry.GenerationPropertyInvestStatement.description,
  model: Schema,
  context: Registry.GenerationPropertyInvestStatement.context,
  translations: Registry.GenerationPropertyInvestStatement.translations,
}
