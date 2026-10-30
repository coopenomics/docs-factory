import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.StorageAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.StorageAgreement.Action

// Модель данных
export type Model = Registry.StorageAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    blagorost_storage_agreement_number: { type: 'string' },
    blagorost_storage_agreement_created_at: { type: 'string' },
    contributor_contract_number: { type: 'string' },
    generator_agreement_number: { type: 'string' },
    generator_agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'blagorost_storage_agreement_number', 'blagorost_storage_agreement_created_at', 'contributor_contract_number', 'generator_agreement_number', 'generator_agreement_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.StorageAgreement.title,
  description: Registry.StorageAgreement.description,
  model: Schema,
  context: Registry.StorageAgreement.context,
  translations: Registry.StorageAgreement.translations,
}
