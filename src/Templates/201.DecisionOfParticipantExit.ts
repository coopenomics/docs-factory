import type { JSONSchemaType } from 'ajv'

import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { individualSchema } from '../Schema/IndividualSchema'
import { VarsSchema, organizationSchema } from '../Schema'
import { CooperativeSchema } from '../Schema/CooperativeSchema'
import { entrepreneurSchema } from '../Schema/EntrepreneurSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.DecisionOfParticipantExit.registry_id

/**
 * Интерфейс генерации решения совета о выходе пайщика из кооператива
 */
export type Action = Registry.DecisionOfParticipantExit.Action

export type Model = Registry.DecisionOfParticipantExit.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['individual', 'entrepreneur', 'organization'],
    },
    individual: {
      type: 'object',
      properties: {
        ...individualSchema.properties,
      },
      required: [...individualSchema.required],
      additionalProperties: true,
      nullable: true,
    },
    organization: {
      type: 'object',
      properties: {
        ...organizationSchema.properties,
      },
      required: [...organizationSchema.required],
      additionalProperties: true,
      nullable: true,
    },
    entrepreneur: {
      type: 'object',
      properties: {
        ...entrepreneurSchema.properties,
      },
      required: [...entrepreneurSchema.required],
      additionalProperties: true,
      nullable: true,
    },
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
  },
  required: ['meta', 'coop', 'type', 'decision'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.DecisionOfParticipantExit.title,
  description: Registry.DecisionOfParticipantExit.description,
  model: Schema,
  context: Registry.DecisionOfParticipantExit.context,
  translations: Registry.DecisionOfParticipantExit.translations,
}
