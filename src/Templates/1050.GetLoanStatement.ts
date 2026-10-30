import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.GetLoanStatement.registry_id

// Модель действия для генерации
export type Action = Registry.GetLoanStatement.Action

// Модель данных
export type Model = Registry.GetLoanStatement.Model

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
  title: Registry.GetLoanStatement.title,
  description: Registry.GetLoanStatement.description,
  model: Schema,
  context: Registry.GetLoanStatement.context,
  translations: Registry.GetLoanStatement.translations,
}
