import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CapitalProgramPrivateDataSchema } from '../Schema/CapitalProgramPrivateDataSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.BlagorostOffer.registry_id

export type Action = Registry.BlagorostOffer.Action

export type Model = Registry.BlagorostOffer.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    doc_data: CapitalProgramPrivateDataSchema,
    common_user: CommonUserSchema,
    blagorost_agreement_number: { type: 'string' },
    blagorost_agreement_created_at: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'common_user', 'blagorost_agreement_number', 'blagorost_agreement_created_at', 'doc_data'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BlagorostOffer.title,
  description: Registry.BlagorostOffer.description,
  model: Schema,
  context: Registry.BlagorostOffer.context,
  translations: Registry.BlagorostOffer.translations,
}
