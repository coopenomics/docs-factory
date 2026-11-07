import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceInvestAgreement } from '../Templates'

export { MarketplaceInvestAgreement as Template } from '../Templates'

/** Договор участия в хозяйственной деятельности по ЦПП «Стол заказов»: пайщик и номер договора. Задача 99D-29. */
export const Factory = defineBuilder<MarketplaceInvestAgreement.Action, MarketplaceInvestAgreement.Model>()({
  registry_id: MarketplaceInvestAgreement.registry_id,
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
    user: Format.commonUser(userData),
    agreement_number: data.agreement_number,
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
