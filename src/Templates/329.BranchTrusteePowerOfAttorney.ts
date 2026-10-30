import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { individualSchema } from '../Schema/IndividualSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BranchTrusteePowerOfAttorney.registry_id

// Модель действия для генерации
export type Action = Registry.BranchTrusteePowerOfAttorney.Action

// Модель данных
export type Model = Registry.BranchTrusteePowerOfAttorney.Model

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
    branch_address: { type: 'string' },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'individual', 'branch_name', 'branch_address', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchTrusteePowerOfAttorney.title,
  description: Registry.BranchTrusteePowerOfAttorney.description,
  model: Schema,
  context: Registry.BranchTrusteePowerOfAttorney.context,
  translations: Registry.BranchTrusteePowerOfAttorney.translations,
}
