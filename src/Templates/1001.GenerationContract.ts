import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.GenerationContract.registry_id

// Модель действия для генерации
export type Action = Registry.GenerationContract.Action

// Модель данных
export type Model = Registry.GenerationContract.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    contributor_contract_number: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'contributor_contract_number'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.GenerationContract.title,
  description: Registry.GenerationContract.description,
  model: Schema,
  context: Registry.GenerationContract.context,
  translations: Registry.GenerationContract.translations,
}
