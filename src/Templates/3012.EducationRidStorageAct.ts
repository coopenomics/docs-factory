import type { JSONSchemaType } from 'ajv'
import { Registry } from '@coopenomics/docs-templates'
import type { ITemplate } from '../Interfaces'
import { IMetaJSONSchema } from '../Schema/MetaSchema'
import { CooperativeSchema } from '../Schema'
import { VarsSchema } from '../Schema/VarsSchema'
import { CommonUserSchema } from '../Schema/CommonUserSchema'
import { CommonProgramSchema } from '../Schema/CommonProgramSchema'

export const registry_id = Registry.EducationRidStorageAct.registry_id

export type Action = Registry.EducationRidStorageAct.Action

export type Model = Registry.EducationRidStorageAct.Model

export const Schema: JSONSchemaType<Model> = {
  type: 'object',
  properties: {
    meta: IMetaJSONSchema,
    coop: CooperativeSchema,
    vars: VarsSchema,
    user: CommonUserSchema,
    program: CommonProgramSchema,
    rid_hash: { type: 'string' },
    rid_short_hash: { type: 'string' },
    amount: { type: 'string' },
    rid_type: { type: 'string' },
    course_title: { type: 'string' },
    lesson_number: { type: 'number' },
    lesson_topic: { type: 'string' },
    held_at: { type: 'string' },
    duration_minutes: { type: 'number' },
    materials: { type: 'array', items: { type: 'string' } },
    hold_until: { type: 'string' },
    contract_number: { type: 'string' },
    contract_created_at: { type: 'string' },
    rid_type_human: { type: 'string' },
  },
  required: ['contract_number', 'contract_created_at', 'rid_type_human', 
    'meta', 'coop', 'vars', 'user', 'program',
    'rid_hash', 'rid_short_hash', 'amount', 'rid_type',
    'course_title', 'lesson_number', 'lesson_topic', 'held_at',
    'duration_minutes', 'materials', 'hold_until',
  ],
  additionalProperties: true,
}

export const Template: ITemplate<Model> = {
  title: Registry.EducationRidStorageAct.title,
  description: Registry.EducationRidStorageAct.description,
  model: Schema,
  context: Registry.EducationRidStorageAct.context,
  translations: Registry.EducationRidStorageAct.translations,
}
