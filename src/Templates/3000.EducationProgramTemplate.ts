import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'

export const registry_id = Registry.EducationProgramTemplate.registry_id

export type Action = Registry.EducationProgramTemplate.Action

export type Model = Registry.EducationProgramTemplate.Model

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
  title: Registry.EducationProgramTemplate.title,
  description: Registry.EducationProgramTemplate.description,
  model: Schema,
  context: Registry.EducationProgramTemplate.context,
  translations: Registry.EducationProgramTemplate.translations,
}
