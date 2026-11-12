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

/** Поля бланка владельца 12.11.2026: категория, ссылки, гарантия, прочее, цена единицы, срок гарантии. */
function ownerFormFields(data: MarketplaceInvestPropertyStatement.Action) {
  return {
    property_category: data.property_category ?? '',
    property_media_links: data.property_media_links ?? '',
    property_warranty_terms: data.property_warranty_terms ?? '',
    property_other: data.property_other ?? '',
    property_unit_cost: data.property_unit_cost ? Format.formatAsset(data.property_unit_cost) : '',
    property_warranty_days: data.property_warranty_days ?? '',
  }
}

/** Версия 1.1: текст Приложения № 1 владельца (12.11.2026) — категория, ссылки, гарантийные условия и срок, стоимость единицы. */
export const Factory_1_1 = defineBuilder<MarketplaceInvestPropertyStatement.Action, MarketplaceInvestPropertyStatement.Model>()({
  registry_id: MarketplaceInvestPropertyStatement.registry_id,
  version: '1.1',
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
    ...ownerFormFields(data),
  }),
  signer: ({ reads: { userData } }) => Format.commonUser(userData).full_name_or_short_name,
})
