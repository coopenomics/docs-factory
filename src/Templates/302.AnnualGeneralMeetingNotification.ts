import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CommonUserSchema, CooperativeSchema, MeetPointSchema, MeetSchema, VarsSchema } from '../Schema'

export const registry_id = Registry.AnnualGeneralMeetingNotification.registry_id

// Модель действия для генерации
export type Action = Registry.AnnualGeneralMeetingNotification.Action

// Модель данных
export type Model = Registry.AnnualGeneralMeetingNotification.Model

// Схема для сверки
export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    meet: MeetSchema,
    questions: {
      type: 'array',
      items: MeetPointSchema,
    },
  },
  required: ['meta', 'coop', 'vars', 'meet', 'questions', 'user'],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.AnnualGeneralMeetingNotification.title,
  description: Registry.AnnualGeneralMeetingNotification.description,
  model: Schema,
  context: Registry.AnnualGeneralMeetingNotification.context,
  translations: Registry.AnnualGeneralMeetingNotification.translations,
}
