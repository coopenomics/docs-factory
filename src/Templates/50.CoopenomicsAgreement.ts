import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, organizationSchema } from '../Schema'

export const registry_id = Registry.CoopenomicsAgreement.registry_id

// Модель действия для генерации
export type Action = Registry.CoopenomicsAgreement.Action

// Модель данных
export type Model = Registry.CoopenomicsAgreement.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    partner: organizationSchema,
  },
  required: ['meta', 'coop', 'vars', 'partner'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.CoopenomicsAgreement.title,
  description: Registry.CoopenomicsAgreement.description,
  model: Schema,
  context: Registry.CoopenomicsAgreement.context,
  translations: Registry.CoopenomicsAgreement.translations,
}
