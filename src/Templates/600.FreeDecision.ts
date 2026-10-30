import type { JSONSchemaType } from 'ajv'

import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema/CooperativeSchema'
import { decisionSchema } from '../Schema/DecisionSchema'
import { VarsSchema } from '../Schema'

export const registry_id = Registry.FreeDecision.registry_id

/**
 * Интерфейс генерации решения совета
 */
export type Action = Registry.FreeDecision.Action

export type Model = Registry.FreeDecision.Model

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
    project: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string', nullable: true },
        question: { type: 'string' },
        decision: { type: 'string' },
      },
      required: ['id', 'question', 'decision'],
      additionalProperties: true,
    },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'decision', 'project'], // vars не вносим для обратной совместимости начиная с версии 2.25
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.FreeDecision.title,
  description: Registry.FreeDecision.description,
  model: Schema,
  context: Registry.FreeDecision.context,
  translations: Registry.FreeDecision.translations,
}
