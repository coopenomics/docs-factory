import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { AnnualGeneralMeetingNotification } from '../Templates'

export { AnnualGeneralMeetingNotification as Template } from '../Templates'

/** Уведомление о проведении общего собрания: собрание, вопросы и председатель собрания. */
export const Factory = defineBuilder<AnnualGeneralMeetingNotification.Action, AnnualGeneralMeetingNotification.Model>()({
  registry_id: AnnualGeneralMeetingNotification.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    meet: () => f.getMeet(data.coopname, data.meet_hash, data.block_num),
  }),
  derive: ({ data, f, reads: { meet } }) => ({
    questions: () => f.getMeetQuestions(data.coopname, Number(meet.id), data.block_num),
    presider: () => f.getUser(meet.presider, data.block_num),
  }),
  assemble: ({ meta, reads: { coop, vars, meet }, derived: { questions, presider } }) => ({
    meta,
    coop,
    vars,
    meet,
    questions,
    user: Format.commonUser(presider),
  }),
  signer: ({ derived: { presider } }) => Format.commonUser(presider).full_name_or_short_name,
})

/**
 * Версия 1.1 (компонент 76 «Общее собрание уполномоченных»): форма собрания —
 * собрание пайщиков или собрание уполномоченных — берётся из записи собрания,
 * закреплённой при одобрении советом, а не из флага кооператива на блоке
 * документа. Собрание без формы (одобрено до её появления) следует флагу
 * кооператива, как в 1.0. Версия 1.0 заморожена: подписанные документы
 * пересобираются ею.
 */
export const Factory_1_1 = defineBuilder<AnnualGeneralMeetingNotification.Action, AnnualGeneralMeetingNotification.Model>()({
  registry_id: AnnualGeneralMeetingNotification.registry_id,
  version: '1.1',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    meet: () => f.getMeet(data.coopname, data.meet_hash, data.block_num),
  }),
  derive: ({ data, f, reads: { meet } }) => ({
    questions: () => f.getMeetQuestions(data.coopname, Number(meet.id), data.block_num),
    presider: () => f.getUser(meet.presider, data.block_num),
  }),
  assemble: ({ meta, reads: { coop, vars, meet }, derived: { questions, presider } }) => ({
    meta,
    coop: Format.meetCooperative(coop, meet),
    vars,
    meet,
    questions,
    user: Format.commonUser(presider),
  }),
  signer: ({ derived: { presider } }) => Format.commonUser(presider).full_name_or_short_name,
})
