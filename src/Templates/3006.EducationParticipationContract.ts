import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.EducationParticipationContract.registry_id

export type Action = Registry.EducationParticipationContract.Action

export type Model = Registry.EducationParticipationContract.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    common_user: CommonUserSchema,
    contract_number: { type: 'string' },
    contract_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'contract_number', 'contract_created_at'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationParticipationContract.title,
  description: Registry.EducationParticipationContract.description,
  model: Schema,
  context: Registry.EducationParticipationContract.context,
  translations: Registry.EducationParticipationContract.translations,
}
