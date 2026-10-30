import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { CooperativeSchema } from '../Schema'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.ComponentGenerationContract.registry_id

// Модель действия для генерации
export type Action = Registry.ComponentGenerationContract.Action

// Модель данных
export type Model = Registry.ComponentGenerationContract.Model

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
    parent_appendix_hash: { type: 'string' },
    short_parent_appendix_hash: { type: 'string' },
    contributor_contract_number: { type: 'string' },
    contributor_contract_created_at: { type: 'string' },
    component_name: { type: 'string' },
    component_hash: { type: 'string' },
    project_name: { type: 'string' },
    project_hash: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'appendix_hash', 'short_appendix_hash', 'parent_appendix_hash', 'short_parent_appendix_hash', 'contributor_contract_number', 'contributor_contract_created_at', 'component_name', 'component_hash', 'project_name', 'project_hash'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ComponentGenerationContract.title,
  description: Registry.ComponentGenerationContract.description,
  model: Schema,
  context: Registry.ComponentGenerationContract.context,
  translations: Registry.ComponentGenerationContract.translations,
}
