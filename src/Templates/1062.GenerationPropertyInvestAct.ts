import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.GenerationPropertyInvestAct.registry_id

// Модель действия для генерации
export type Action = Registry.GenerationPropertyInvestAct.Action

// Модель данных
export type Model = Registry.GenerationPropertyInvestAct.Model

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
  title: Registry.GenerationPropertyInvestAct.title,
  description: Registry.GenerationPropertyInvestAct.description,
  model: Schema,
  context: Registry.GenerationPropertyInvestAct.context,
  translations: Registry.GenerationPropertyInvestAct.translations,
}
