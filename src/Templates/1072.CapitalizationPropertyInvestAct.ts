import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'

export const registry_id = Registry.CapitalizationPropertyInvestAct.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationPropertyInvestAct.Action

// Модель данных
export type Model = Registry.CapitalizationPropertyInvestAct.Model

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
  title: Registry.CapitalizationPropertyInvestAct.title,
  description: Registry.CapitalizationPropertyInvestAct.description,
  model: Schema,
  context: Registry.CapitalizationPropertyInvestAct.context,
  translations: Registry.CapitalizationPropertyInvestAct.translations,
}
