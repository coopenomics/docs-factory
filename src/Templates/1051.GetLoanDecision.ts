import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.GetLoanDecision.registry_id

// Модель действия для генерации
export type Action = Registry.GetLoanDecision.Action

// Модель данных
export type Model = Registry.GetLoanDecision.Model

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
  title: Registry.GetLoanDecision.title,
  description: Registry.GetLoanDecision.description,
  model: Schema,
  context: Registry.GetLoanDecision.context,
  translations: Registry.GetLoanDecision.translations,
}
