import type { IGenerate, IMetaDocument } from '../../document'
import type { ICooperativeData, IVars } from '../../model'
import type { IIndividualData } from '../../users'

export const registry_id = 330

/**
 * Интерфейс генерации доверенности, выдаваемой председателем кооперативного
 * участка доверенному лицу участка (пайщику-оператору). Доверитель —
 * председатель кооперативного участка (trustee), накладывающий встречную
 * подпись при одобрении заявки доверенного; уполномоченный («Гражданин») —
 * доверенное лицо участка (trusted), действующее в качестве
 * бухгалтера-кассира/оператора. Документ подписывается двумя сторонами:
 * сначала доверенным лицом при подаче заявки, затем встречной подписью
 * председателя участка.
 */
export interface Action extends IGenerate {
  hash: string
  branch_name: string
  // username председателя участка; ФИО резолвит фабрика через getUser,
  // в meta (→ on-chain) записывается только username
  trustee: string
  // Реквизиты, которые вписывает узел (решение владельца 18.11.2026).
  /** Номер доверенности — сквозной номер в кооперативе */
  poa_number: string
  /** Номер и дата протокола совета об учреждении участка, ДД.ММ.ГГГГ */
  protocol_number: string
  protocol_date: string
  /** Номер и дата действующей доверенности председателя участка, ДД.ММ.ГГГГ */
  trustee_poa_number: string
  trustee_poa_date: string
  /** Последний день срока доверенности (год со дня выдачи), ДД.ММ.ГГГГ */
  valid_until: string
}

export type Meta = IMetaDocument & Action

// Модель данных
export interface Model {
  meta: IMetaDocument
  coop: ICooperativeData
  individual: IIndividualData
  branch_name: string
  trustee_full_name: string
  poa_number: string
  protocol_number: string
  protocol_date: string
  trustee_poa_number: string
  trustee_poa_date: string
  valid_until: string
  vars: IVars
}

export const title = 'Доверенность доверенному лицу кооперативного участка'
export const description = 'Форма доверенности, выдаваемой председателем кооперативного участка доверенному лицу участка (пайщику-оператору) на право действовать в качестве бухгалтера-кассира/оператора участка'
export const context = `<style>.digital-document h1 {margin: 0px;text-align:center;font-size: 16px;}.digital-document {padding: 20px;white-space: pre-wrap;}.digital-document p {margin: 0px;padding-top: 10px;text-align: justify;}.coop-header {text-align: center;padding-bottom: 10px;}.coop-header p {padding-top: 2px;text-align: center;}.signature {padding-top: 20px;}</style><div class="digital-document"><div class="coop-header"><p><strong>{% trans 'BRANCH_HEADER', branch_name %}</strong></p><p><strong>{{ vars.full_abbr_genitive }} «{{ vars.name }}»</strong></p><p>{% trans 'OGRN' %} {{ coop.details.ogrn }}</p><p>{% trans 'INN' %} {{ coop.details.inn }} / {% trans 'KPP' %} {{ coop.details.kpp }}</p></div><h1 class="header">{% trans 'POA_TITLE', poa_number %}</h1><p style="text-align: right; padding-top: 10px;">{{ coop.city }}, {{ created_at }}</p><p>{% trans 'PREAMBLE_INTRO', branch_name, vars.full_abbr, vars.name, trustee_full_name, protocol_number, protocol_date, trustee_poa_number, trustee_poa_date %} <strong>{{ individual.last_name }} {{ individual.first_name }} {{ individual.middle_name }}</strong>{% if individual.passport %} ({% trans 'PASSPORT_INLINE', individual.passport.series, individual.passport.number, individual.passport.issued_at, individual.passport.issued_by, individual.passport.code, individual.full_address %}){% endif %} {% trans 'PREAMBLE_POWERS', branch_name, vars.full_abbr, vars.name, branch_name, vars.full_abbr, vars.name, trustee_full_name %}</p><p>{% trans 'RESPONSIBILITY', individual.last_name, individual.first_name, individual.middle_name, vars.full_abbr, vars.name %}</p><p>{% trans 'SIGNATURE_CERTIFIED', individual.last_name, individual.first_name, individual.middle_name %}</p><p>{% trans 'NON_TRANSFERABLE' %}</p><p>{% trans 'TERM_ONE_YEAR', valid_until %}</p><div class="signature" style="padding-top: 30px;"><p>{% trans 'PRINCIPAL_SIGNATURE', branch_name, vars.full_abbr_genitive, vars.name, trustee_full_name %}</p><p>{% trans 'SIGNED_DIGITALLY' %}</p><p style="padding-top: 10px;">{% trans 'SEAL' %}</p></div></div>`

export const translations = {
  ru: {
    POA_TITLE: 'ДОВЕРЕННОСТЬ № {0}',
    BRANCH_HEADER: 'Кооперативный участок «{0}»',
    PREAMBLE_INTRO: 'Председатель Кооперативного участка «{0}» {1} «{2}» {3}, действующий на основании Протокола № {4} от {5} и Доверенности № {6} от {7}, настоящей доверенностью уполномочивает пайщика',
    PASSPORT_INLINE: 'паспорт серия: {0} № {1}, выдан: {2} {3}, к/п {4}, зарегистрирован: {5}',
    PREAMBLE_POWERS: 'действовать в качестве бухгалтера-кассира/оператора на Кооперативном участке «{0}» и осуществлять взаимодействие с пайщиками {1} «{2}» по оформлению, приёму, выдаче, расчётам, обороту имущества и иных ценностей в соответствии с указаниями Председателя Кооперативного участка «{3}» {4} «{5}» {6}.',
    RESPONSIBILITY: 'Гражданин {0} {1} {2} несёт ответственность за все свои действия и деловые операции, осуществляемые в интересах {3} «{4}».',
    SIGNATURE_CERTIFIED: 'Подпись гражданина {0} {1} {2} удостоверяю.',
    NON_TRANSFERABLE: 'Полномочия по настоящей доверенности не могут быть переданы другим лицам.',
    TERM_ONE_YEAR: 'Доверенность выдана на срок один год, по {0} включительно.',
    PRINCIPAL_SIGNATURE: 'Подпись доверителя / Председатель Кооперативного участка «{0}» {1} «{2}» {3}',
    INN: 'ИНН',
    KPP: 'КПП',
    OGRN: 'ОГРН',
    SEAL: 'М.П. (КУ)',
    SIGNED_DIGITALLY: 'подписано электронной подписью',
  },
}

export const exampleData = {
  coop: {
    city: 'Москва',
    full_address: 'г. Москва, ул. Ленина, д. 1',
    details: {
      inn: '7712345678',
      kpp: '771201001',
      ogrn: '1234567890123',
    },
  },
  meta: {
    created_at: '20.03.2024 12:00',
  },
  individual: {
    last_name: 'Сидоров',
    first_name: 'Иван',
    middle_name: 'Петрович',
    full_address: 'г. Москва, ул. Советская, д. 3, кв. 84',
    phone: '+79001234567',
    passport: {
      series: '7712',
      number: '122112',
      issued_by: 'отделом УФМС России по г. Москве',
      issued_at: '10.05.2010',
      code: '220-220',
    },
  },
  poa_number: '8',
  protocol_number: '12',
  protocol_date: '18.11.2026',
  trustee_poa_number: '7',
  trustee_poa_date: '18.11.2026',
  valid_until: '17.11.2027',
  branch_name: 'РОМАШКА',
  trustee_full_name: 'Иванов Пётр Сидорович',
  vars: {
    full_abbr: 'Потребительский кооператив',
    full_abbr_genitive: 'Потребительского кооператива',
    name: 'ВОСХОД',
    passport_request: 'yes',
  },
}
