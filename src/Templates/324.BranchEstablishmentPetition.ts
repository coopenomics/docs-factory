import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BranchEstablishmentPetition.registry_id

// Модель действия для генерации
export type Action = Registry.BranchEstablishmentPetition.Action

// Модель данных
export type Model = Registry.BranchEstablishmentPetition.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    user: CommonUserSchema,
    branch_name: { type: 'string' },
    address: { type: 'string' },
    chairman_full_name: { type: 'string' },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'user', 'branch_name', 'address', 'chairman_full_name', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchEstablishmentPetition.title,
  description: Registry.BranchEstablishmentPetition.description,
  model: Schema,
  context: Registry.BranchEstablishmentPetition.context,
  translations: Registry.BranchEstablishmentPetition.translations,
}
