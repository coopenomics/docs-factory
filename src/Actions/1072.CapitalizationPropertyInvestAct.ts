import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { CapitalizationPropertyInvestAct } from '../Templates'
import { getBlagorostContractRef, propertyFormFields, propertyPositionFields } from '../Utils/blagorostPropertyContribution'

export { CapitalizationPropertyInvestAct as Template } from '../Templates'

/** Акт об имущественном взносе в капитализацию: только мета, остальное в тексте шаблона. */
export const Factory = defineBuilder<CapitalizationPropertyInvestAct.Action, CapitalizationPropertyInvestAct.Model>()({
  registry_id: CapitalizationPropertyInvestAct.registry_id,
  version: '1.0',
  reads: () => ({}),
  // Заглушка 1.0 собирала только мету и документов в цепях не дала; модель шаблона
  // с версии 1.1 шире (позиция имущества, реквизиты договоров). Код версии заморожен.
  // @ts-expect-error модель 1.1 требует полей, которых у заглушки нет
  assemble: ({ meta }) => ({ meta }),
})

/**
 * Акт приёма-передачи имущества в «Благорост»: реквизиты договоров, принятое
 * советом решение, позиция имущества. Вторую подпись председатель ставит на
 * этот же документ — пересборки для неё нет.
 */
export const Factory_1_1 = defineBuilder<CapitalizationPropertyInvestAct.Action, CapitalizationPropertyInvestAct.Model>()({
  registry_id: CapitalizationPropertyInvestAct.registry_id,
  version: '1.1',
  reads: ({ data, f, s }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
    contract: () => getBlagorostContractRef(s, data),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    decision: () => f.getApprovedDecision(coop, data.coopname, data.decision_id),
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
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})

/** Версия 1.2: то же, что 1.1, плюс форма имущества — вещь или нематериальное имущество. */
export const Factory_1_2 = defineBuilder<CapitalizationPropertyInvestAct.Action, CapitalizationPropertyInvestAct.Model>()({
  registry_id: CapitalizationPropertyInvestAct.registry_id,
  version: '1.2',
  reads: ({ data, f, s }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
    contract: () => getBlagorostContractRef(s, data),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    decision: () => f.getApprovedDecision(coop, data.coopname, data.decision_id),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData, contract }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    decision,
    common_user: Format.commonUser(userData),
    ...contract,
    ...propertyPositionFields(data),
    ...propertyFormFields(data),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
