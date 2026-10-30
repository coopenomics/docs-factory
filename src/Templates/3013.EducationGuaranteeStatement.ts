import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'

export const registry_id = Registry.EducationGuaranteeStatement.registry_id

export type Action = Registry.EducationGuaranteeStatement.Action

export type Model = Registry.EducationGuaranteeStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    claim_hash: { type: 'string' },
    claim_short_hash: { type: 'string' },
    course_title: { type: 'string' },
    subscribed_at: { type: 'string' },
    amount: { type: 'string' },
    guarantee_until: { type: 'string' },
    reason: { type: 'string' },
    links: { type: 'array', items: { type: 'string' } },
  },
  required: ['meta', 'coop', 'vars', 'user', 'claim_hash', 'claim_short_hash', 'course_title', 'subscribed_at', 'amount', 'guarantee_until', 'reason', 'links'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationGuaranteeStatement.title,
  description: Registry.EducationGuaranteeStatement.description,
  model: Schema,
  context: Registry.EducationGuaranteeStatement.context,
  translations: Registry.EducationGuaranteeStatement.translations,
}
