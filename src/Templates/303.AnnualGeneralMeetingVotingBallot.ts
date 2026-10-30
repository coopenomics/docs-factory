import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, MeetSchema, VarsSchema } from '../Schema'

// Схема для объекта ответа с голосованием (упрощенная версия)
const AnswerSchema: JSONSchemaType<Registry.AnnualGeneralMeetingVotingBallot.IAnswer> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    number: { type: 'string' },
    vote: { type: 'string', enum: ['for', 'against', 'abstained'] },
  },
  required: ['id', 'number', 'vote'],
  additionalProperties: true,
}

// Схема для объекта вопроса
const QuestionSchema: JSONSchemaType<Registry.AnnualGeneralMeetingVotingBallot.IQuestion> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    number: { type: 'string' },
    title: { type: 'string' },
    context: { type: 'string' },
    decision: { type: 'string' },
  },
  required: ['id', 'number', 'title', 'context', 'decision'],
  additionalProperties: true,
}

export const registry_id = Registry.AnnualGeneralMeetingVotingBallot.registry_id

// Модель действия для генерации
export type Action = Registry.AnnualGeneralMeetingVotingBallot.Action

// Модель данных
export type Model = Registry.AnnualGeneralMeetingVotingBallot.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    meet: MeetSchema,
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
  },
  required: ['meta', 'coop', 'vars', 'meet', 'user', 'answers', 'questions'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.AnnualGeneralMeetingVotingBallot.title,
  description: Registry.AnnualGeneralMeetingVotingBallot.description,
  model: Schema,
  context: Registry.AnnualGeneralMeetingVotingBallot.context,
  translations: Registry.AnnualGeneralMeetingVotingBallot.translations,
}
