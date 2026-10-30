import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, organizationSchema } from '../Schema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonRequestSchema } from '../Schema/CommonRequestSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceReturnCancelStatement.registry_id

export type Action = Registry.MarketplaceReturnCancelStatement.Action

export type Model = Registry.MarketplaceReturnCancelStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    orderer: CommonUserSchema,
    request: CommonRequestSchema,
    program: CommonProgramSchema,
    branch: { ...organizationSchema, nullable: true },
    fact_cost: { type: 'string' },
    fee_refund: { type: 'string' },
    total_refund: { type: 'string' },
    actual_quantity: { type: 'string' },
    reason_text: { type: 'string' },
    inspection_result: { type: 'string' },
    order_hash: { type: 'string' },
    request_hash: { type: 'string' },
    issue_decision_id: { type: 'string' },
  },
  required: [
    'meta', 'coop', 'vars', 'user', 'orderer', 'request', 'program',
    'fact_cost', 'fee_refund', 'total_refund', 'actual_quantity',
    'reason_text', 'inspection_result', 'order_hash', 'request_hash', 'issue_decision_id',
  ],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceReturnCancelStatement.title,
  description: Registry.MarketplaceReturnCancelStatement.description,
  model: Schema,
  context: Registry.MarketplaceReturnCancelStatement.context,
  translations: Registry.MarketplaceReturnCancelStatement.translations,
}
