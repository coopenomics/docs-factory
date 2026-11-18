import { defineBuilder } from '../Builder'
import { BranchTrusteePowerOfAttorney } from '../Templates'

export { BranchTrusteePowerOfAttorney as Template } from '../Templates'

/** Доверенность председателю участка: физлицо, название и адрес участка. */
export const Factory = defineBuilder<BranchTrusteePowerOfAttorney.Action, BranchTrusteePowerOfAttorney.Model>()({
  registry_id: BranchTrusteePowerOfAttorney.registry_id,
  version: '1.0',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData } }) => {
    if (userData.type !== 'individual')
      throw new Error('Председателем кооперативного участка может быть только физическое лицо')
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return {
      meta,
      coop,
      vars,
      individual,
      branch_name: data.branch_name,
      branch_address: data.branch_address,
    }
  },
  signer: ({ reads: { userData } }) => {
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return `${individual.last_name} ${individual.first_name} ${individual.middle_name}`
  },
})

/**
 * Версия 1.1 (решение владельца 18.11.2026): доверенность подписывается после
 * решения совета об учреждении участка. Номер доверенности, номер и дата
 * протокола совета и последний день срока вписывает узел — в тексте нет
 * прочерков. Версия 1.0 заморожена: подписанные документы пересобираются ею.
 */
export const Factory_1_1 = defineBuilder<BranchTrusteePowerOfAttorney.Action, BranchTrusteePowerOfAttorney.Model>()({
  registry_id: BranchTrusteePowerOfAttorney.registry_id,
  version: '1.1',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData } }) => {
    if (userData.type !== 'individual')
      throw new Error('Председателем кооперативного участка может быть только физическое лицо')
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return {
      meta,
      coop,
      vars,
      individual,
      branch_name: data.branch_name,
      branch_address: data.branch_address,
      // Реквизиты доверенности вписывает узел: номер — сквозной в кооперативе,
      // протокол — решение совета об учреждении участка, срок — год со дня выдачи.
      poa_number: data.poa_number,
      protocol_number: data.protocol_number,
      protocol_date: data.protocol_date,
      valid_until: data.valid_until,
    }
  },
  signer: ({ reads: { userData } }) => {
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return `${individual.last_name} ${individual.first_name} ${individual.middle_name}`
  },
})

/**
 * Версия 1.2: без реквизитов узла (poa_number, protocol_number, protocol_date, valid_until) фабрика документ не собирает —
 * общая генерация в обход узла давала доверенность с пустыми полями. Версия 1.1
 * заморожена.
 */
export const Factory_1_2 = defineBuilder<BranchTrusteePowerOfAttorney.Action, BranchTrusteePowerOfAttorney.Model>()({
  registry_id: BranchTrusteePowerOfAttorney.registry_id,
  version: '1.2',
  reads: ({ data, f }) => ({
    coop: () => f.getCooperative(data.coopname, data.block_num),
    vars: () => f.getVars(data.coopname, data.block_num),
    userData: () => f.getUser(data.username, data.block_num),
  }),
  assemble: ({ data, meta, reads: { coop, vars, userData } }) => {
    // Реквизиты вписывает узел; без них документ вышел бы с пустыми полями.
    const missing = ['poa_number', 'protocol_number', 'protocol_date', 'valid_until'].filter(key => !data[key as keyof typeof data])
    if (missing.length)
      throw new Error(`Доверенность председателю кооперативного участка: нет реквизитов ${missing.join(', ')} — документ собирает узел расширения участков`)
    if (userData.type !== 'individual')
      throw new Error('Председателем кооперативного участка может быть только физическое лицо')
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return {
      meta,
      coop,
      vars,
      individual,
      branch_name: data.branch_name,
      branch_address: data.branch_address,
      // Реквизиты доверенности вписывает узел: номер — сквозной в кооперативе,
      // протокол — решение совета об учреждении участка, срок — год со дня выдачи.
      poa_number: data.poa_number,
      protocol_number: data.protocol_number,
      protocol_date: data.protocol_date,
      valid_until: data.valid_until,
    }
  },
  signer: ({ reads: { userData } }) => {
    const individual = userData.data as BranchTrusteePowerOfAttorney.Model['individual']
    return `${individual.last_name} ${individual.first_name} ${individual.middle_name}`
  },
})
