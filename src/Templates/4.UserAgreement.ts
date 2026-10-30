import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.UserAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.UserAgreement.Action

// Модель данных
export type Model = Registry.UserAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: {
      type: 'object',
      properties: {
        full_name: { type: 'string' },
      },
      required: ['full_name'],
    },
  },
  required: ['meta', 'coop', 'vars', 'user'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.UserAgreement.title,
  description: Registry.UserAgreement.description,
  model: Schema,
  context: Registry.UserAgreement.context,
  translations: Registry.UserAgreement.translations,
}
