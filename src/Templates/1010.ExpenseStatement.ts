import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.ExpenseStatement.registry_id

// Модель действия для генерации
export type Action = Registry.ExpenseStatement.Action

// Модель данных
export type Model = Registry.ExpenseStatement.Model

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
  title: Registry.ExpenseStatement.title,
  description: Registry.ExpenseStatement.description,
  model: Schema,
  context: Registry.ExpenseStatement.context,
  translations: Registry.ExpenseStatement.translations,
}
