import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceInvestPropertyAct } from '../Templates'
import { propertyFormFields, propertyPositionFields } from '../Utils/blagorostPropertyContribution'

export { MarketplaceInvestPropertyAct as Template } from '../Templates'

/** Акт приёма-передачи имущества в кооператив: принятое советом решение, позиция имущества; вторую подпись председатель участка ставит на этот же документ. Задача 99D-29. */
export const Factory = defineBuilder<MarketplaceInvestPropertyAct.Action, MarketplaceInvestPropertyAct.Model>()({
  registry_id: MarketplaceInvestPropertyAct.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    decision: () => f.getApprovedDecision(coop, data.coopname, data.decision_id),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    decision,
    common_user: Format.commonUser(userData),
    branch_chairman_name: data.branch_chairman_name,
    branch_name: data.branch_name,
    agreement_number: data.agreement_number,
    agreement_created_at: data.agreement_created_at,
    ...propertyPositionFields(data),
    ...propertyFormFields(data),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})

/** Поля бланка акта владельца 12.11.2026: стоимость единицы и срок гарантии; форма имущества без подписи — источник не назначен. */
function ownerActFields(data: MarketplaceInvestPropertyAct.Action) {
  return {
    property_form_label: '',
    property_unit_cost: data.property_unit_cost ? Format.formatAsset(data.property_unit_cost) : '',
    property_warranty_days: data.property_warranty_days ?? '',
    property_category: data.property_category ?? '',
    property_media_links: data.property_media_links ?? '',
    property_warranty_terms: data.property_warranty_terms ?? '',
    property_other: data.property_other ?? '',
  }
}

/** Версия 1.1: текст Приложения № 2 владельца (12.11.2026) — стоимость единицы, срок Гарантийного обязательства. */
export const Factory_1_1 = defineBuilder<MarketplaceInvestPropertyAct.Action, MarketplaceInvestPropertyAct.Model>()({
  registry_id: MarketplaceInvestPropertyAct.registry_id,
  version: '1.1',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    decision: () => f.getApprovedDecision(coop, data.coopname, data.decision_id),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    decision,
    common_user: Format.commonUser(userData),
    branch_chairman_name: data.branch_chairman_name,
    branch_name: data.branch_name,
    agreement_number: data.agreement_number,
    agreement_created_at: data.agreement_created_at,
    ...propertyPositionFields(data),
    ...propertyFormFields(data),
    ...ownerActFields(data),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
