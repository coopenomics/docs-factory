import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.BlagorostAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.BlagorostAgreement.Action

// Модель данных
export type Model = Registry.BlagorostAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    blagorost_agreement_number: { type: 'string' },
    contributor_contract_number: { type: 'string' },
    contributor_contract_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'blagorost_agreement_number', 'contributor_contract_number', 'contributor_contract_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BlagorostAgreement.title,
  description: Registry.BlagorostAgreement.description,
  model: Schema,
  context: Registry.BlagorostAgreement.context,
  translations: Registry.BlagorostAgreement.translations,
}
