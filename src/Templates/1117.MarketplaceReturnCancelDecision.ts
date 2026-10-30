import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, decisionSchema, organizationSchema } from '../Schema'
import { CommonRequestSchema } from '../Schema/CommonRequestSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceReturnCancelDecision.registry_id

export type Action = Registry.MarketplaceReturnCancelDecision.Action

export type Model = Registry.MarketplaceReturnCancelDecision.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    operator: CommonUserSchema,
    request: CommonRequestSchema,
    decision: decisionSchema,
    program: CommonProgramSchema,
    branch: { ...organizationSchema, nullable: true },
    fact_cost: { type: 'string' },
    fee_refund: { type: 'string' },
    total_refund: { type: 'string' },
    reason_text: { type: 'string' },
    inspection_result: { type: 'string' },
    order_hash: { type: 'string' },
    request_hash: { type: 'string' },
    issue_decision_id: { type: 'string' },
  },
  required: [
    'meta', 'coop', 'vars', 'user', 'operator', 'request', 'decision', 'program',
    'fact_cost', 'fee_refund', 'total_refund', 'reason_text', 'inspection_result',
    'order_hash', 'request_hash', 'issue_decision_id',
  ],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceReturnCancelDecision.title,
  description: Registry.MarketplaceReturnCancelDecision.description,
  model: Schema,
  context: Registry.MarketplaceReturnCancelDecision.context,
  translations: Registry.MarketplaceReturnCancelDecision.translations,
}
