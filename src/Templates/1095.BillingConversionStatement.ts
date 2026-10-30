import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BillingConversionStatement.registry_id

// Модель действия для генерации
export type Action = Registry.BillingConversionStatement.Action

// Модель данных
export type Model = Registry.BillingConversionStatement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: {
      type: 'object',
      properties: {
        ...IMetaJSONSchema.properties,
      },
      required: [...IMetaJSONSchema.required],
      additionalProperties: true,
    },
    vars: VarsSchema,
    coop: CooperativeSchema,
    commonUser: {
      type: 'object',
      properties: {
        ...CommonUserSchema.properties,
      },
      required: [...CommonUserSchema.required],
      additionalProperties: true,
    },
  },
  required: ['meta', 'vars', 'coop', 'commonUser'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BillingConversionStatement.title,
  description: Registry.BillingConversionStatement.description,
  model: Schema,
  context: Registry.BillingConversionStatement.context,
  translations: Registry.BillingConversionStatement.translations,
}
