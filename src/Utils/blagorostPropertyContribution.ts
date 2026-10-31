import { UdataKey } from '@coopenomics/docs-templates'
import type { FactorySources } from '../Sources'
import * as Format from '../Format'

export interface BlagorostContractRef {
  contributor_contract_number: string
  contributor_contract_created_at: string
  blagorost_agreement_number: string
  blagorost_agreement_created_at: string
}

/**
 * Номер и дата договора УХД пайщика и его соглашения о присоединении к ЦПП
 * «Благорост». Документы паевого взноса имуществом (1070–1072) — приложения
 * к этому договору и называют оба реквизита; бэкенд Благороста пишет их в
 * Udata при подписании.
 */
export async function getBlagorostContractRef(
  sources: FactorySources,
  data: { coopname: string, username: string, block_num?: number },
): Promise<BlagorostContractRef> {
  const read = (key: UdataKey) => sources.udata({ coopname: data.coopname, username: data.username, key, block_num: data.block_num })
  const [contractNumber, contractCreatedAt, agreementNumber, agreementCreatedAt] = await Promise.all([
    read(UdataKey.BLAGOROST_CONTRIBUTOR_CONTRACT_NUMBER),
    read(UdataKey.BLAGOROST_CONTRIBUTOR_CONTRACT_CREATED_AT),
    read(UdataKey.BLAGOROST_AGREEMENT_NUMBER),
    read(UdataKey.BLAGOROST_AGREEMENT_CREATED_AT),
  ])
  if (!contractNumber?.value)
    throw new Error('Данные договора УХД участника не найдены в Udata')
  if (!contractCreatedAt?.value)
    throw new Error('Дата создания договора УХД участника не найдена в Udata')
  if (!agreementNumber?.value)
    throw new Error('Данные соглашения благороста не найдены в Udata')
  if (!agreementCreatedAt?.value)
    throw new Error('Дата создания соглашения благороста не найдена в Udata')

  return {
    contributor_contract_number: String(contractNumber.value),
    contributor_contract_created_at: String(contractCreatedAt.value),
    blagorost_agreement_number: String(agreementNumber.value),
    blagorost_agreement_created_at: String(agreementCreatedAt.value),
  }
}

export interface PropertyPosition {
  property_hash: string
  property_name: string
  property_description: string
  property_quantity: string
  property_unit: string
  property_amount: string
}

/**
 * Позиция имущества в документе: короткий номер (он же номер приложения,
 * заявления ЗПВИ и акта АППИ) и оценка в денежном формате документа. Одна
 * позиция на заявление — решение владельца 30.10.2026.
 */
export function propertyPositionFields(data: PropertyPosition) {
  return {
    property_hash: data.property_hash,
    property_short_hash: Format.shortHash(data.property_hash),
    property_name: data.property_name,
    property_description: data.property_description,
    property_quantity: data.property_quantity,
    property_unit: data.property_unit,
    property_amount: Format.formatAsset(data.property_amount),
  }
}

/** Подпись формы имущества в документах 1070–1072 (сборщик 1.2). */
const PROPERTY_FORM_LABELS: Record<string, string> = {
  thing: 'Вещь (имущество в натуральной форме)',
  intangible: 'Нематериальное имущество в объективной форме (документ, методика, файл)',
}

/**
 * Форма имущества из заявления. Неизвестное значение подписи не получает —
 * шаблон выводит прежний текст «Имущество в натуральной форме».
 */
export function propertyFormFields(data: { property_form?: string }) {
  const form = data.property_form ?? ''
  return {
    property_form: form,
    property_form_label: PROPERTY_FORM_LABELS[form] ?? '',
  }
}
