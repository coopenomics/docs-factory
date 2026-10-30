import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, decisionSchema, organizationSchema } from '../Schema'
import { CommonRequestSchema } from '../Schema/CommonRequestSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { FirstLastMiddleNameSchema } from '../Schema/FirstLastMiddleNameSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceShareReturnAct.registry_id

export type Action = Registry.MarketplaceShareReturnAct.Action

export type Model = Registry.MarketplaceShareReturnAct.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    request: CommonRequestSchema,
    user: CommonUserSchema,
    decision: decisionSchema,
    act_id: { type: 'string' },
    transmitter: FirstLastMiddleNameSchema,
    program: CommonProgramSchema,
    branch: { ...organizationSchema, nullable: true },
  },
  required: ['meta', 'coop', 'vars', 'request', 'user', 'decision', 'act_id', 'transmitter', 'program'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceShareReturnAct.title,
  description: Registry.MarketplaceShareReturnAct.description,
  model: Schema,
  context: Registry.MarketplaceShareReturnAct.context,
  translations: Registry.MarketplaceShareReturnAct.translations,
}
