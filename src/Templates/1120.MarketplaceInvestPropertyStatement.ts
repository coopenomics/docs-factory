import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.MarketplaceInvestPropertyStatement.registry_id

// Модель действия для генерации
export type Action = Registry.MarketplaceInvestPropertyStatement.Action

// Модель данных
export type Model = Registry.MarketplaceInvestPropertyStatement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    branch_name: { type: 'string' },
    branch_chairman_name: { type: 'string' },
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    agreement_number: { type: 'string' },
    agreement_created_at: { type: 'string' },
    property_hash: { type: 'string' },
    property_short_hash: { type: 'string' },
    property_name: { type: 'string' },
    property_description: { type: 'string' },
    property_quantity: { type: 'string' },
    property_unit: { type: 'string' },
    property_amount: { type: 'string' },
    property_form: { type: 'string', nullable: true },
    property_form_label: { type: 'string', nullable: true },
  },
  required: ['meta', 'branch_name', 'branch_chairman_name', 'coop', 'vars', 'common_user', 'agreement_number', 'agreement_created_at', 'property_hash', 'property_short_hash', 'property_name', 'property_description', 'property_quantity', 'property_unit', 'property_amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceInvestPropertyStatement.title,
  description: Registry.MarketplaceInvestPropertyStatement.description,
  model: Schema,
  context: Registry.MarketplaceInvestPropertyStatement.context,
  translations: Registry.MarketplaceInvestPropertyStatement.translations,
}
