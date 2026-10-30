import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema, VarsSchema } from '../Schema'

// Схема вопроса протокола с результатами голосования
const ProtocolQuestionSchema: JSONSchemaType<Registry.BranchMeetingDecision.IBranchProtocolQuestion> = {
  type: 'object',
  properties: {
    number: { type: 'string' },
    title: { type: 'string' },
    context: { type: 'string', nullable: true },
    decision: { type: 'string' },
    counter_votes_for: { type: 'string' },
    counter_votes_against: { type: 'string' },
    counter_votes_abstained: { type: 'string' },
    votes_for_percent: { type: 'number' },
    votes_against_percent: { type: 'number' },
    votes_abstained_percent: { type: 'number' },
    is_accepted: { type: 'boolean' },
  },
  required: ['number', 'title', 'decision', 'counter_votes_for', 'counter_votes_against', 'counter_votes_abstained', 'votes_for_percent', 'votes_against_percent', 'votes_abstained_percent', 'is_accepted'],
  additionalProperties: true,
}

export const registry_id = Registry.BranchMeetingDecision.registry_id

// Модель действия для генерации
export type Action = Registry.BranchMeetingDecision.Action

// Модель данных
export type Model = Registry.BranchMeetingDecision.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    protocol_number: { type: 'string' },
    chairman_full_name: { type: 'string' },
    open_at_datetime: { type: 'string' },
    close_at_datetime: { type: 'string' },
    current_quorum_percent: { type: 'number' },
    questions: {
      type: 'array',
      items: ProtocolQuestionSchema,
      minItems: 1,
    },
    vars: VarsSchema,
  },
  required: ['meta', 'coop', 'protocol_number', 'chairman_full_name', 'open_at_datetime', 'close_at_datetime', 'current_quorum_percent', 'questions', 'vars'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.BranchMeetingDecision.title,
  description: Registry.BranchMeetingDecision.description,
  model: Schema,
  context: Registry.BranchMeetingDecision.context,
  translations: Registry.BranchMeetingDecision.translations,
}
