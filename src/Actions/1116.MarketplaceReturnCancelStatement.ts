import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceReturnCancelStatement } from '../Templates'

export { MarketplaceReturnCancelStatement as Template } from '../Templates'

/** Заявление оператора участка об отмене сделки по гарантийному возврату: оператор, заказчик, имущество, участок. */
export const Factory = defineBuilder<MarketplaceReturnCancelStatement.Action, MarketplaceReturnCancelStatement.Model>()({
  registry_id: MarketplaceReturnCancelStatement.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    operator: () => f.getUser(data.username, data.block_num),
    orderer: () => f.getUser(data.orderer, data.block_num),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    branch: async () => {
      if (coop.is_branched && !data.braname)
        throw new Error('Branch name is required')
      return data.braname ? f.getOrganization(data.braname, data.block_num) : undefined
    },
  }),
  assemble: ({ data, meta, reads: { coop, vars, operator, orderer }, derived: { branch } }) => ({
    meta,
    coop,
    vars,
    user: Format.commonUser(operator),
    orderer: Format.commonUser(orderer),
    request: {
      hash: data.sku,
      title: data.product_title,
      unit_of_measurement: data.unit_of_measurement,
      units: data.actual_quantity,
      unit_cost: data.unit_cost,
      total_cost: data.fact_cost,
      currency: data.currency,
      type: 'receive',
      program_id: 0,
    },
    program: { name: 'Стол заказов' },
    branch,
    fact_cost: data.fact_cost,
    fee_refund: data.fee_refund,
    total_refund: data.total_refund,
    actual_quantity: String(data.actual_quantity),
    reason_text: data.reason_text,
    inspection_result: data.inspection_result,
    order_hash: data.order_hash,
    request_hash: data.request_hash,
    issue_decision_id: data.issue_decision_id > 0 ? String(data.issue_decision_id) : '',
  }),
  signer: ({ reads: { operator } }) => Format.commonUser(operator).full_name_or_short_name,
})

/**
 * Версия 1.1 (99D-11): суммы в тексте — через `Format.formatAsset`, два знака,
 * как во всех документах. Цепь отдаёт четыре знака, и версия 1.0 печатала их
 * как есть либо срезала нули («300»). Версия 1.0 заморожена: подписанные
 * документы пересобираются ею.
 */
export const Factory_1_1 = defineBuilder<MarketplaceReturnCancelStatement.Action, MarketplaceReturnCancelStatement.Model>()({
  registry_id: MarketplaceReturnCancelStatement.registry_id,
  version: '1.1',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    operator: () => f.getUser(data.username, data.block_num),
    orderer: () => f.getUser(data.orderer, data.block_num),
  }),
  derive: ({ data, f, reads: { coop } }) => ({
    branch: async () => {
      if (coop.is_branched && !data.braname)
        throw new Error('Branch name is required')
      return data.braname ? f.getOrganization(data.braname, data.block_num) : undefined
    },
  }),
  assemble: ({ data, meta, reads: { coop, vars, operator, orderer }, derived: { branch } }) => ({
    meta,
    coop,
    vars,
    user: Format.commonUser(operator),
    orderer: Format.commonUser(orderer),
    request: {
      hash: data.sku,
      title: data.product_title,
      unit_of_measurement: data.unit_of_measurement,
      units: data.actual_quantity,
      unit_cost: Format.formatAsset(data.unit_cost),
      total_cost: Format.formatAsset(data.fact_cost),
      currency: data.currency,
      type: 'receive',
      program_id: 0,
    },
    program: { name: 'Стол заказов' },
    branch,
    fact_cost: Format.formatAsset(data.fact_cost),
    fee_refund: Format.formatAsset(data.fee_refund),
    total_refund: Format.formatAsset(data.total_refund),
    actual_quantity: String(data.actual_quantity),
    reason_text: data.reason_text,
    inspection_result: data.inspection_result,
    order_hash: data.order_hash,
    request_hash: data.request_hash,
    issue_decision_id: data.issue_decision_id > 0 ? String(data.issue_decision_id) : '',
  }),
  signer: ({ reads: { operator } }) => Format.commonUser(operator).full_name_or_short_name,
})
