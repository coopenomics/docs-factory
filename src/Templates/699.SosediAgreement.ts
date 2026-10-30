import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.SosediAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.SosediAgreement.Action

// Модель данных
export type Model = Registry.SosediAgreement.Model

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
  title: Registry.SosediAgreement.title,
  description: Registry.SosediAgreement.description,
  model: Schema,
  context: Registry.SosediAgreement.context,
  translations: Registry.SosediAgreement.translations,
}
