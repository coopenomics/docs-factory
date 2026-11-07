import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceInvestClaimStatement } from '../Templates'

export { MarketplaceInvestClaimStatement as Template } from '../Templates'

/** Заявление о трансляции средств с кошелька договора участия на главный паевой: участок, сумма и реквизиты договора. Задача 99D-29. */
export const Factory = defineBuilder<MarketplaceInvestClaimStatement.Action, MarketplaceInvestClaimStatement.Model>()({
  registry_id: MarketplaceInvestClaimStatement.registry_id,
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
    claim_hash: data.claim_hash,
    branch_name: data.branch_name,
    agreement_number: data.agreement_number,
    agreement_created_at: data.agreement_created_at,
    amount: Format.formatAsset(data.amount),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
