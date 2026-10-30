import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { individualSchema } from '../Schema/IndividualSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BranchTrustedLiabilityAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.BranchTrustedLiabilityAgreement.Action

// Модель данных
export type Model = Registry.BranchTrustedLiabilityAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    individual: {
      type: 'object',
      properties: {
        ...individualSchema.properties,
      },
      required: [...individualSchema.required],
      additionalProperties: true,
    },
    branch_name: { type: 'string' },
    trustee_full_name: { type: 'string' },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'individual', 'branch_name', 'trustee_full_name', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchTrustedLiabilityAgreement.title,
  description: Registry.BranchTrustedLiabilityAgreement.description,
  model: Schema,
  context: Registry.BranchTrustedLiabilityAgreement.context,
  translations: Registry.BranchTrustedLiabilityAgreement.translations,
}
