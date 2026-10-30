import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.EducationShareWithdrawStatement.registry_id

export type Action = Registry.EducationShareWithdrawStatement.Action

export type Model = Registry.EducationShareWithdrawStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationShareWithdrawStatement.title,
  description: Registry.EducationShareWithdrawStatement.description,
  model: Schema,
  context: Registry.EducationShareWithdrawStatement.context,
  translations: Registry.EducationShareWithdrawStatement.translations,
}
