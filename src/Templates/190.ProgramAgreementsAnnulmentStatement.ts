import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.ProgramAgreementsAnnulmentStatement.registry_id

export type Action = Registry.ProgramAgreementsAnnulmentStatement.Action
export type Model = Registry.ProgramAgreementsAnnulmentStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    user: CommonUserSchema,
    vars: VarsSchema,
    exit_hash: { type: 'string' },
    programs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          program_id: { type: 'number' },
          title: { type: 'string' },
          agreement_signed_at: { type: 'string' },
          agreement_hash: { type: 'string' },
          refund: { type: 'string' },
          wallets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                wallet_name: { type: 'string' },
                human_name: { type: 'string' },
                balance: { type: 'string' },
                returns: { type: 'boolean' },
              },
              required: ['wallet_name', 'human_name', 'balance', 'returns'],
              additionalProperties: true,
            },
          },
        },
        required: ['program_id', 'title', 'agreement_signed_at', 'agreement_hash', 'refund', 'wallets'],
        additionalProperties: true,
      },
    },
    total_refund: { type: 'string' },
  },
  required: ['meta', 'coop', 'user', 'vars', 'exit_hash', 'programs', 'total_refund'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.ProgramAgreementsAnnulmentStatement.title,
  description: Registry.ProgramAgreementsAnnulmentStatement.description,
  model: Schema,
  context: Registry.ProgramAgreementsAnnulmentStatement.context,
  translations: Registry.ProgramAgreementsAnnulmentStatement.translations,
}
