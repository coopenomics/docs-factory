import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.ProjectGenerationContract.registry_id

// Модель действия для генерации
export type Action = Registry.ProjectGenerationContract.Action

// Модель данных
export type Model = Registry.ProjectGenerationContract.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    appendix_hash: { type: 'string' },
    short_appendix_hash: { type: 'string' },
    contributor_contract_number: { type: 'string' },
    contributor_contract_created_at: { type: 'string' },
    project_name: { type: 'string' },
    project_hash: { type: 'string' },
    generator_agreement_number: { type: 'string' },
    generator_agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'appendix_hash', 'short_appendix_hash', 'contributor_contract_number', 'contributor_contract_created_at', 'project_name', 'project_hash', 'generator_agreement_number', 'generator_agreement_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ProjectGenerationContract.title,
  description: Registry.ProjectGenerationContract.description,
  model: Schema,
  context: Registry.ProjectGenerationContract.context,
  translations: Registry.ProjectGenerationContract.translations,
}
