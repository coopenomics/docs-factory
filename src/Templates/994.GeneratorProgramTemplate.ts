import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CapitalProgramPrivateDataSchema } from '../Schema/CapitalProgramPrivateDataSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.GeneratorProgramTemplate.registry_id

// Модель действия для генерации
export type Action = Registry.GeneratorProgramTemplate.Action

// Модель данных
export type Model = Registry.GeneratorProgramTemplate.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    doc_data: CapitalProgramPrivateDataSchema,
  },
  required: ['meta', 'coop', 'vars', 'doc_data'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.GeneratorProgramTemplate.title,
  description: Registry.GeneratorProgramTemplate.description,
  model: Schema,
  context: Registry.GeneratorProgramTemplate.context,
  translations: Registry.GeneratorProgramTemplate.translations,
}
