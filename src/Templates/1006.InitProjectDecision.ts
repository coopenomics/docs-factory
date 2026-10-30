import type { JSONSchemaType } from 'ajv'

import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema/CooperativeSchema'
import { decisionSchema } from '../Schema/DecisionSchema'
import { VarsSchema } from '../Schema'

export const registry_id = Registry.InitProjectDecision.registry_id

/**
 * Интерфейс генерации решения совета по инициализации проекта
 */
export type Action = Registry.InitProjectDecision.Action

export type Model = Registry.InitProjectDecision.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    coop: {
      type: 'object',
      properties: {
        ...CooperativeSchema.properties,
      },
      required: [...CooperativeSchema.required],
      additionalProperties: true,
    },
    decision: {
      type: 'object',
      properties: {
        ...decisionSchema.properties,
      },
      required: [...decisionSchema.required],
      additionalProperties: true,
    },
    meta: {
      type: 'object',
      properties: {
        ...IMetaJSONSchema.properties,
      },
      required: [...IMetaJSONSchema.required],
      additionalProperties: true,
    },
    vars: VarsSchema,
    project_name: { type: 'string' },
    project_hash: { type: 'string' },
    component_name: { type: 'string' },
    component_hash: { type: 'string' },
    is_component: { type: 'boolean' },
  },
  required: ['meta', 'coop', 'decision', 'project_name', 'project_hash', 'component_name', 'component_hash', 'is_component'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.InitProjectDecision.title,
  description: Registry.InitProjectDecision.description,
  model: Schema,
  context: Registry.InitProjectDecision.context,
  translations: Registry.InitProjectDecision.translations,
}
