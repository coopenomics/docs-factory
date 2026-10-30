import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.CapitalizationMoneyInvestStatement.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationMoneyInvestStatement.Action

// Модель данных
export type Model = Registry.CapitalizationMoneyInvestStatement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    amount: { type: 'string' },
  },
  required: ['meta', 'vars', 'common_user', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.CapitalizationMoneyInvestStatement.title,
  description: Registry.CapitalizationMoneyInvestStatement.description,
  model: Schema,
  context: Registry.CapitalizationMoneyInvestStatement.context,
  translations: Registry.CapitalizationMoneyInvestStatement.translations,
}
