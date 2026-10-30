import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.CapitalizationToMainWalletConvertStatement.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationToMainWalletConvertStatement.Action

// Модель данных
export type Model = Registry.CapitalizationToMainWalletConvertStatement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.CapitalizationToMainWalletConvertStatement.title,
  description: Registry.CapitalizationToMainWalletConvertStatement.description,
  model: Schema,
  context: Registry.CapitalizationToMainWalletConvertStatement.context,
  translations: Registry.CapitalizationToMainWalletConvertStatement.translations,
}
