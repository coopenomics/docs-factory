import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.ReturnByMoney.registry_id

// Модель действия для генерации
export type Action = Registry.ReturnByMoney.Action

// Модель данных
export type Model = Registry.ReturnByMoney.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    payment_details: { type: 'string' },
    quantity: { type: 'string' },
    currency: { type: 'string' },
    payment_hash: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'payment_details', 'quantity', 'currency', 'payment_hash'],
  additionalProperties: false,
}

export const Template: ITemplate<Model> = {
  title: Registry.ReturnByMoney.title,
  description: Registry.ReturnByMoney.description,
  model: Schema,
  context: Registry.ReturnByMoney.context,
  translations: Registry.ReturnByMoney.translations,
}
