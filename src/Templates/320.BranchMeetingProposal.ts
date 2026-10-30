import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

// Схема вопроса повестки собрания участка
const QuestionSchema: JSONSchemaType<{ number: string, title: string, context?: string, decision: string }> = {
  type: 'object',
  properties: {
    number: { type: 'string' },
    title: { type: 'string' },
    context: { type: 'string', nullable: true },
    decision: { type: 'string' },
  },
  required: ['number', 'title', 'decision'],
  additionalProperties: true,
}

export const registry_id = Registry.BranchMeetingProposal.registry_id

// Модель действия для генерации
export type Action = Registry.BranchMeetingProposal.Action

// Модель данных
export type Model = Registry.BranchMeetingProposal.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    user: CommonUserSchema,
    type: { type: 'string', enum: ['createbranch', 'free'] },
    questions: {
      type: 'array',
      items: QuestionSchema,
      minItems: 1,
    },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'user', 'type', 'questions', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchMeetingProposal.title,
  description: Registry.BranchMeetingProposal.description,
  model: Schema,
  context: Registry.BranchMeetingProposal.context,
  translations: Registry.BranchMeetingProposal.translations,
}
