import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, decisionSchema } from '../Schema'
import { CommonRequestSchema } from '../Schema/CommonRequestSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceShareReturnDecision.registry_id

export type Action = Registry.MarketplaceShareReturnDecision.Action

export type Model = Registry.MarketplaceShareReturnDecision.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    request: CommonRequestSchema,
    user: CommonUserSchema,
    decision: decisionSchema,
    program: CommonProgramSchema,
  },
  required: ['meta', 'coop', 'vars', 'request', 'user', 'decision', 'program'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceShareReturnDecision.title,
  description: Registry.MarketplaceShareReturnDecision.description,
  model: Schema,
  context: Registry.MarketplaceShareReturnDecision.context,
  translations: Registry.MarketplaceShareReturnDecision.translations,
}
