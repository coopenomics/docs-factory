import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { CapitalizationPropertyInvestDecision } from '../Templates'
import { getBlagorostContractRef, propertyPositionFields } from '../Utils/blagorostPropertyContribution'

export { CapitalizationPropertyInvestDecision as Template } from '../Templates'

/** Решение об имущественном взносе в капитализацию: только мета, остальное в тексте шаблона. */
export const Factory = defineBuilder<CapitalizationPropertyInvestDecision.Action, CapitalizationPropertyInvestDecision.Model>()({
  registry_id: CapitalizationPropertyInvestDecision.registry_id,
  version: '1.0',
  reads: () => ({}),
  // Заглушка 1.0 собирала только мету и документов в цепях не дала; модель шаблона
  // с версии 1.1 шире (позиция имущества, реквизиты договоров). Код версии заморожен.
  // @ts-expect-error модель 1.1 требует полей, которых у заглушки нет
  assemble: ({ meta }) => ({ meta }),
})

/** Протокол совета о приёме паевого взноса имуществом: реквизиты договоров, голоса по решению, позиция имущества из заявления. */
export const Factory_1_1 = defineBuilder<CapitalizationPropertyInvestDecision.Action, CapitalizationPropertyInvestDecision.Model>()({
  registry_id: CapitalizationPropertyInvestDecision.registry_id,
  version: '1.1',
  reads: ({ data, f, s }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
    contract: () => getBlagorostContractRef(s, data),
  }),
  derive: ({ data, f, meta, reads: { coop } }) => ({
    decision: () => f.getDecision(coop, data.coopname, data.decision_id, meta.created_at, meta.timezone),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData, contract }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    decision,
    common_user: Format.commonUser(userData),
    ...contract,
    ...propertyPositionFields(data),
  }),
})
