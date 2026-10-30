import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, decisionSchema } from '../Schema'

export const registry_id = Registry.BranchEstablishmentSovietDecision.registry_id

// Модель действия для генерации
export type Action = Registry.BranchEstablishmentSovietDecision.Action

// Модель данных
export type Model = Registry.BranchEstablishmentSovietDecision.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    decision: decisionSchema,
    branch_name: { type: 'string' },
    address: { type: 'string' },
    chairman_full_name: { type: 'string' },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'decision', 'branch_name', 'address', 'chairman_full_name', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchEstablishmentSovietDecision.title,
  description: Registry.BranchEstablishmentSovietDecision.description,
  model: Schema,
  context: Registry.BranchEstablishmentSovietDecision.context,
  translations: Registry.BranchEstablishmentSovietDecision.translations,
}
