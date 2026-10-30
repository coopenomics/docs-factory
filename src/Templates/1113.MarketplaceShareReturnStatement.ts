import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema, organizationSchema } from '../Schema'
import { CommonRequestSchema } from '../Schema/CommonRequestSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.MarketplaceShareReturnStatement.registry_id

export type Action = Registry.MarketplaceShareReturnStatement.Action

export type Model = Registry.MarketplaceShareReturnStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    request: CommonRequestSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    branch: { ...organizationSchema, nullable: true },
  },
  required: ['meta', 'coop', 'vars', 'request', 'user', 'program'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.MarketplaceShareReturnStatement.title,
  description: Registry.MarketplaceShareReturnStatement.description,
  model: Schema,
  context: Registry.MarketplaceShareReturnStatement.context,
  translations: Registry.MarketplaceShareReturnStatement.translations,
}
