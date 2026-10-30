import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.ExpenseDecision.registry_id

// Модель действия для генерации
export type Action = Registry.ExpenseDecision.Action

// Модель данных
export type Model = Registry.ExpenseDecision.Model

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
  title: Registry.ExpenseDecision.title,
  description: Registry.ExpenseDecision.description,
  model: Schema,
  context: Registry.ExpenseDecision.context,
  translations: Registry.ExpenseDecision.translations,
}
