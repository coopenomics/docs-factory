import { defineBuilder } from '../Builder'
import * as Format from '../Format'
import { MarketplaceReturnCancelDecision } from '../Templates'

export { MarketplaceReturnCancelDecision as Template } from '../Templates'

/** Числовая строка без лишних нулей; не число — как есть. */
function cleanNum(s: string): string {
  const n = Number.parseFloat(s)
  return Number.isFinite(n) ? String(n) : s
}

/** Протокол совета об отмене сделки по гарантийному возврату: заказчик, оператор, имущество, голоса, участок. */
export const Factory = defineBuilder<MarketplaceReturnCancelDecision.Action, MarketplaceReturnCancelDecision.Model>()({
  registry_id: MarketplaceReturnCancelDecision.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    user: () => f.getUser(data.username, data.block_num),
    operator: () => f.getUser(data.operator, data.block_num),
    branch: () => (data.braname ? f.getOrganization(data.braname, data.block_num) : Promise.resolve(undefined)),
  }),
  derive: ({ data, f, meta, reads: { coop } }) => ({
    decision: () => f.getDecision(coop, data.coopname, data.decision_id, meta.created_at, meta.timezone),
  }),
  assemble: ({ data, meta, reads: { coop, vars, user, operator, branch }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    user: Format.commonUser(user),
    operator: Format.commonUser(operator),
    request: {
      hash: data.sku,
      title: data.product_title,
      unit_of_measurement: data.unit_of_measurement,
      units: data.actual_quantity,
      unit_cost: cleanNum(data.unit_cost),
      total_cost: cleanNum(data.fact_cost),
      currency: data.currency,
      type: 'receive',
      program_id: 0,
    },
    decision,
    program: { name: 'Стол заказов' },
    branch,
    fact_cost: cleanNum(data.fact_cost),
    fee_refund: cleanNum(data.fee_refund),
    total_refund: cleanNum(data.total_refund),
    reason_text: data.reason_text,
    inspection_result: data.inspection_result,
    order_hash: data.order_hash,
    request_hash: data.request_hash,
    issue_decision_id: Number(data.issue_decision_id) > 0 ? String(data.issue_decision_id) : '',
  }),
})

/**
 * Версия 1.1 (99D-11): суммы в тексте — через `Format.formatAsset`, два знака,
 * как во всех документах. Цепь отдаёт четыре знака, и версия 1.0 печатала их
 * как есть либо срезала нули («300»). Версия 1.0 заморожена: подписанные
 * документы пересобираются ею.
 */
export const Factory_1_1 = defineBuilder<MarketplaceReturnCancelDecision.Action, MarketplaceReturnCancelDecision.Model>()({
  registry_id: MarketplaceReturnCancelDecision.registry_id,
  version: '1.1',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    user: () => f.getUser(data.username, data.block_num),
    operator: () => f.getUser(data.operator, data.block_num),
    branch: () => (data.braname ? f.getOrganization(data.braname, data.block_num) : Promise.resolve(undefined)),
  }),
  derive: ({ data, f, meta, reads: { coop } }) => ({
    decision: () => f.getDecision(coop, data.coopname, data.decision_id, meta.created_at, meta.timezone),
  }),
  assemble: ({ data, meta, reads: { coop, vars, user, operator, branch }, derived: { decision } }) => ({
    meta,
    coop,
    vars,
    user: Format.commonUser(user),
    operator: Format.commonUser(operator),
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
    decision,
    program: { name: 'Стол заказов' },
    branch,
    fact_cost: Format.formatAsset(data.fact_cost),
    fee_refund: Format.formatAsset(data.fee_refund),
    total_refund: Format.formatAsset(data.total_refund),
    reason_text: data.reason_text,
    inspection_result: data.inspection_result,
    order_hash: data.order_hash,
    request_hash: data.request_hash,
    issue_decision_id: Number(data.issue_decision_id) > 0 ? String(data.issue_decision_id) : '',
  }),
})
