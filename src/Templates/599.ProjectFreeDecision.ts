import type { JSONSchemaType } from 'ajv'

import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema/CooperativeSchema'
import { decisionSchema } from '../Schema/DecisionSchema'
import { VarsSchema } from '../Schema'

export const registry_id = Registry.ProjectFreeDecision.registry_id

/**
 * Интерфейс генерации решения совета
 */
export type Action = Registry.ProjectFreeDecision.Action

export type Model = Registry.ProjectFreeDecision.Model

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
    meta: {
      type: 'object',
      properties: {
        ...IMetaJSONSchema.properties,
      },
      required: [...IMetaJSONSchema.required],
      additionalProperties: true,
    },
    project: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string', nullable: true, maxLength: 200 },
        question: { type: 'string' },
        decision: { type: 'string' },
      },
      required: ['id', 'question', 'decision'],
      additionalProperties: true,
    },
    suggester_name: { type: 'string' },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'project', 'suggester_name', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ProjectFreeDecision.title,
  description: Registry.ProjectFreeDecision.description,
  model: Schema,
  context: Registry.ProjectFreeDecision.context,
  translations: Registry.ProjectFreeDecision.translations,
}
