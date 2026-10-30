import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.CapitalizationPropertyInvestAct.registry_id

// Модель действия для генерации
export type Action = Registry.CapitalizationPropertyInvestAct.Action

// Модель данных
export type Model = Registry.CapitalizationPropertyInvestAct.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    common_user: CommonUserSchema,
    contributor_contract_number: { type: 'string' },
    contributor_contract_created_at: { type: 'string' },
    blagorost_agreement_number: { type: 'string' },
    blagorost_agreement_created_at: { type: 'string' },
    property_hash: { type: 'string' },
    property_short_hash: { type: 'string' },
    property_name: { type: 'string' },
    property_description: { type: 'string' },
    property_quantity: { type: 'string' },
    property_unit: { type: 'string' },
    property_amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'decision', 'common_user', 'contributor_contract_number', 'contributor_contract_created_at', 'blagorost_agreement_number', 'blagorost_agreement_created_at', 'property_hash', 'property_short_hash', 'property_name', 'property_description', 'property_quantity', 'property_unit', 'property_amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.CapitalizationPropertyInvestAct.title,
  description: Registry.CapitalizationPropertyInvestAct.description,
  model: Schema,
  context: Registry.CapitalizationPropertyInvestAct.context,
  translations: Registry.CapitalizationPropertyInvestAct.translations,
}
