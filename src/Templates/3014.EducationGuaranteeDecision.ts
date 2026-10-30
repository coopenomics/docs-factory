import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { decisionSchema } from '../Schema/DecisionSchema'

export const registry_id = Registry.EducationGuaranteeDecision.registry_id

export type Action = Registry.EducationGuaranteeDecision.Action

export type Model = Registry.EducationGuaranteeDecision.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    user: CommonUserSchema,
    claim_hash: { type: 'string' },
    claim_short_hash: { type: 'string' },
    course_title: { type: 'string' },
    amount: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'decision', 'user', 'claim_hash', 'claim_short_hash', 'course_title', 'amount'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationGuaranteeDecision.title,
  description: Registry.EducationGuaranteeDecision.description,
  model: Schema,
  context: Registry.EducationGuaranteeDecision.context,
  translations: Registry.EducationGuaranteeDecision.translations,
}
