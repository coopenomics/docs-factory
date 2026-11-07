import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceInvestPropertyStatement } from '../Templates'
import { propertyFormFields, propertyPositionFields } from '../Utils/blagorostPropertyContribution'

export { MarketplaceInvestPropertyStatement as Template } from '../Templates'

/** Заявление инициатора о паевом взносе имуществом в кооперативный участок: позиция имущества, участок и реквизиты договора участия; одобрение председателя участка — тот же документ. Задача 99D-29. */
export const Factory = defineBuilder<MarketplaceInvestPropertyStatement.Action, MarketplaceInvestPropertyStatement.Model>()({
  registry_id: MarketplaceInvestPropertyStatement.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData } }) => ({
    meta,
    coop,
    vars,
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
