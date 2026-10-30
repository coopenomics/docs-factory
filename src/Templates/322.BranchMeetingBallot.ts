import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

// Схема волеизъявления по вопросу повестки
const AnswerSchema: JSONSchemaType<Registry.BranchMeetingBallot.IAnswer> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    number: { type: 'string' },
    vote: { type: 'string', enum: ['for', 'against', 'abstained'] },
  },
  required: ['id', 'number', 'vote'],
  additionalProperties: true,
}

// Схема вопроса собрания участка
const QuestionSchema: JSONSchemaType<Registry.BranchMeetingBallot.IQuestion> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    number: { type: 'string' },
    title: { type: 'string' },
    context: { type: 'string', nullable: true },
    decision: { type: 'string' },
  },
  required: ['id', 'number', 'title', 'decision'],
  additionalProperties: true,
}

export const registry_id = Registry.BranchMeetingBallot.registry_id

// Модель действия для генерации
export type Action = Registry.BranchMeetingBallot.Action

// Модель данных
export type Model = Registry.BranchMeetingBallot.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    user: CommonUserSchema,
    answers: {
      type: 'array',
      items: AnswerSchema,
      minItems: 1,
    },
    questions: {
      type: 'array',
      items: QuestionSchema,
      minItems: 1,
    },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'user', 'answers', 'questions', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchMeetingBallot.title,
  description: Registry.BranchMeetingBallot.description,
  model: Schema,
  context: Registry.BranchMeetingBallot.context,
  translations: Registry.BranchMeetingBallot.translations,
}
