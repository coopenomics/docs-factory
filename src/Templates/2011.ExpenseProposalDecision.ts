import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { decisionSchema } from '../Schema/DecisionSchema'
import {
  CooperativeSchema,
  ExpenseItemSchema,
  ExpenseProposalDecisionBodySchema,
  ExpenseProposalHeaderSchema,
  VarsSchema,
} from '../Schema'

export const registry_id = Registry.ExpenseProposalDecision.registry_id

export type Action = Registry.ExpenseProposalDecision.Action
export type Model = Registry.ExpenseProposalDecision.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: {
      type: 'object',
      properties: {
        ...decisionSchema.properties,
      },
      required: [...decisionSchema.required],
      additionalProperties: true,
    },
    proposal_hash: { type: 'string' },
    proposal_short_hash: { type: 'string' },
    proposal: ExpenseProposalHeaderSchema,
    items: {
      type: 'array',
      items: ExpenseItemSchema,
    },
    resolution: ExpenseProposalDecisionBodySchema,
  },
  required: ['meta', 'coop', 'vars', 'decision', 'proposal_hash', 'proposal_short_hash', 'proposal', 'items', 'resolution'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ExpenseProposalDecision.title,
  description: Registry.ExpenseProposalDecision.description,
  model: Schema,
  context: Registry.ExpenseProposalDecision.context,
  translations: Registry.ExpenseProposalDecision.translations,
}
