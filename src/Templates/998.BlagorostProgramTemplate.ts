import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CapitalProgramPrivateDataSchema } from '../Schema/CapitalProgramPrivateDataSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BlagorostProgramTemplate.registry_id

export type Action = Registry.BlagorostProgramTemplate.Action

export type Model = Registry.BlagorostProgramTemplate.Model

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
  title: Registry.BlagorostProgramTemplate.title,
  description: Registry.BlagorostProgramTemplate.description,
  model: Schema,
  context: Registry.BlagorostProgramTemplate.context,
  translations: Registry.BlagorostProgramTemplate.translations,
}
