import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.EducationTeacherOffer.registry_id

export type Action = Registry.EducationTeacherOffer.Action

export type Model = Registry.EducationTeacherOffer.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    agreement_number: { type: 'string' },
    agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'agreement_number', 'agreement_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationTeacherOffer.title,
  description: Registry.EducationTeacherOffer.description,
  model: Schema,
  context: Registry.EducationTeacherOffer.context,
  translations: Registry.EducationTeacherOffer.translations,
}
