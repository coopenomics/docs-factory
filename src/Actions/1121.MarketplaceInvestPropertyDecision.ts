import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceInvestPropertyDecision } from '../Templates'
import { propertyFormFields, propertyPositionFields } from '../Utils/blagorostPropertyContribution'

export { MarketplaceInvestPropertyDecision as Template } from '../Templates'

/** Протокол решения совета о приёме имущества в кооперативный участок: голоса по решению и позиция имущества. Задача 99D-29. */
export const Factory = defineBuilder<MarketplaceInvestPropertyDecision.Action, MarketplaceInvestPropertyDecision.Model>()({
  registry_id: MarketplaceInvestPropertyDecision.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  derive: ({ data, f, meta, reads: { coop } }) => ({
    decision: () => f.getDecision(coop, data.coopname, data.decision_id, meta.created_at, meta.timezone),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    decision,
    common_user: Format.commonUser(userData),
    branch_name: data.branch_name,
    agreement_number: data.agreement_number,
    agreement_created_at: data.agreement_created_at,
    ...propertyPositionFields(data),
    ...propertyFormFields(data),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
