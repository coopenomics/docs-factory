import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, MeetSchema, QuestionExtendedSchema, VarsSchema, decisionSchema } from '../Schema'

export const registry_id = Registry.AnnualGeneralMeetingDecision.registry_id

/**
 * Интерфейс генерации протокола решения общего собрания
 */
export type Action = Registry.AnnualGeneralMeetingDecision.Action

/**
 * Модель данных документа
 */
export type Model = Registry.AnnualGeneralMeetingDecision.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    decision: decisionSchema,
    meet: MeetSchema,
    questions: {
      type: 'array',
      items: QuestionExtendedSchema,
    },
  },
  required: ['meta', 'coop', 'vars', 'decision', 'meet', 'questions'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.AnnualGeneralMeetingDecision.title,
  description: Registry.AnnualGeneralMeetingDecision.description,
  model: Schema,
  context: Registry.AnnualGeneralMeetingDecision.context,
  translations: Registry.AnnualGeneralMeetingDecision.translations,
}
