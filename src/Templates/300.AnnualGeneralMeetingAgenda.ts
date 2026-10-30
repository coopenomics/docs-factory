import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { AgendaMeetSchema, AgendaQuestionSchema, CommonUserSchema, CooperativeSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.AnnualGeneralMeetingAgenda.registry_id

// Модель действия для генерации
export type Action = Registry.AnnualGeneralMeetingAgenda.Action

// Модель данных
export type Model = Registry.AnnualGeneralMeetingAgenda.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    meet: AgendaMeetSchema,
    user: CommonUserSchema,
    questions: {
      type: 'array',
      items: AgendaQuestionSchema,
    },
    is_repeated: { type: 'boolean' },
  },
  required: ['meta', 'coop', 'vars', 'meet', 'user', 'questions', 'is_repeated'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.AnnualGeneralMeetingAgenda.title,
  description: Registry.AnnualGeneralMeetingAgenda.description,
  model: Schema,
  context: Registry.AnnualGeneralMeetingAgenda.context,
  translations: Registry.AnnualGeneralMeetingAgenda.translations,
}
