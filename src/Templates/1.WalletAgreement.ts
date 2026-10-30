import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.WalletAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.WalletAgreement.Action

// Модель данных
export type Model = Registry.WalletAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.WalletAgreement.title,
  description: Registry.WalletAgreement.description,
  model: Schema,
  context: Registry.WalletAgreement.context,
  translations: Registry.WalletAgreement.translations,
}
