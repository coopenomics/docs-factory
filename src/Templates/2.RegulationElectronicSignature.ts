import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.RegulationElectronicSignature.registry_id

// Модель действия для генерации
export type Action = Registry.RegulationElectronicSignature.Action

// Модель данных
export type Model = Registry.RegulationElectronicSignature.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.RegulationElectronicSignature.title,
  description: Registry.RegulationElectronicSignature.description,
  model: Schema,
  context: Registry.RegulationElectronicSignature.context,
  translations: Registry.RegulationElectronicSignature.translations,
}
