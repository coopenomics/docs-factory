import type { JSONSchemaType } from 'ajv'

import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { individualSchema } from '../Schema/IndividualSchema'
import { VarsSchema, organizationSchema } from '../Schema'
import { CooperativeSchema } from '../Schema/CooperativeSchema'
import { entrepreneurSchema } from '../Schema/EntrepreneurSchema'

export const registry_id = Registry.ParticipantExitApplication.registry_id

/**
 * Интерфейс генерации заявления на выход из состава пайщиков кооператива
 */
export type Action = Registry.ParticipantExitApplication.Action

// Модель данных
export type Model = Registry.ParticipantExitApplication.Model

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
    vars: VarsSchema,
    meta: {
      type: 'object',
      properties: {
        ...IMetaJSONSchema.properties,
      },
      required: [...IMetaJSONSchema.required],
      additionalProperties: true,
    },
  },
  required: ['meta', 'coop', 'type'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ParticipantExitApplication.title,
  description: Registry.ParticipantExitApplication.description,
  model: Schema,
  context: Registry.ParticipantExitApplication.context,
  translations: Registry.ParticipantExitApplication.translations,
}
