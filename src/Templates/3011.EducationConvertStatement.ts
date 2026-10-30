import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.EducationConvertStatement.registry_id

export type Action = Registry.EducationConvertStatement.Action

export type Model = Registry.EducationConvertStatement.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    sub_hash: { type: 'string' },
    amount: { type: 'string' },
    from_program: { type: 'string' },
    total: { type: 'string' },
    from_program_used: { type: 'boolean' },
    convert_used: { type: 'boolean' },
    course_title: { type: 'string' },
    period: { type: 'string' },
    period_human: { type: 'string' },
  },
  required: ['meta', 'coop', 'vars', 'user', 'program', 'sub_hash', 'amount', 'from_program', 'total', 'from_program_used', 'convert_used', 'course_title', 'period', 'period_human'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationConvertStatement.title,
  description: Registry.EducationConvertStatement.description,
  model: Schema,
  context: Registry.EducationConvertStatement.context,
  translations: Registry.EducationConvertStatement.translations,
}
