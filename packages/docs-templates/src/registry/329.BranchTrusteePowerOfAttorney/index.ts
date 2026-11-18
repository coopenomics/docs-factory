import type { IGenerate, IMetaDocument } from '../../document'
import type { ICooperativeData, IVars } from '../../model'
import type { IIndividualData } from '../../users'

export const registry_id = 329

/**
 * Интерфейс генерации доверенности, выдаваемой кооперативом председателю
 * кооперативного участка. Доверитель — кооператив в лице Председателя Совета
 * (накладывает встречную подпись после решения совета об учреждении участка);
 * уполномоченный («Гражданин») — избранный председатель кооперативного участка
 * (trustee), подписывающий доверенность вместе с договором о материальной
 * ответственности при подаче заявления. Документ подписывается двумя сторонами:
 * сначала председателем участка, затем встречной подписью председателя совета.
 */
export interface Action extends IGenerate {
  hash: string
  branch_name: string
  branch_address: string
  // Реквизиты, которые вписывает узел (решение владельца 18.11.2026): доверенность
  // подписывается после решения совета об учреждении участка и ссылается на его протокол.
  /** Номер доверенности — сквозной номер в кооперативе */
  poa_number: string
  /** Номер протокола совета об учреждении участка */
  protocol_number: string
  /** Дата протокола совета, ДД.ММ.ГГГГ */
  protocol_date: string
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
  branch_address: string
  // Реквизиты, которые вписывает узел (версия сборщика 1.1); у документов
  // версии 1.0 их нет.
  poa_number?: string
  protocol_number?: string
  protocol_date?: string
  valid_until?: string
  vars: IVars
}

export const title = 'Доверенность председателю кооперативного участка'
export const description = 'Форма доверенности, выдаваемой кооперативом в лице Председателя Совета избранному председателю кооперативного участка на право представлять участок и распоряжаться его средствами'
export const context = `<style>
h1 { margin: 0px; text-align: center; }
.digital-document { padding: 20px; }
.digital-document p { margin: 0 0 6px; }
.coop-header { text-align: right; padding-bottom: 12px; }
.coop-header p { margin: 0 0 2px; }
.requisites { padding-top: 16px; }
.requisites p { margin: 0 0 2px; }
.signature { padding-top: 24px; }
</style>
<div class="digital-document"><div class="coop-header"><p><strong>{{ vars.full_abbr }} «{{ vars.name }}»</strong></p><p>{% trans 'OGRN' %} {{ coop.details.ogrn }}</p><p>{% trans 'INN' %} {{ coop.details.inn }} / {% trans 'KPP' %} {{ coop.details.kpp }}</p></div><div style="text-align: center"><h1>{% trans 'POA_TITLE' %}</h1><p>{% trans 'POA_NUMBER', poa_number %}</p></div><div style="display: flex; justify-content: space-between;"><p>{{ coop.city }}</p><p>{{ created_at }}</p></div><p>{% trans 'PREAMBLE_INTRO', vars.full_abbr, vars.name, coop.chairman.last_name, coop.chairman.first_name, coop.chairman.middle_name %} <strong>{{ individual.last_name }} {{ individual.first_name }} {{ individual.middle_name }}</strong>{% if individual.passport %} ({% trans 'PASSPORT_INLINE', individual.passport.series, individual.passport.number, individual.passport.issued_at, individual.passport.issued_by, individual.passport.code, individual.full_address %}){% endif %} {% trans 'PREAMBLE_POWERS', branch_name, vars.full_abbr, vars.name, branch_address, vars.full_abbr, vars.name, vars.full_abbr, vars.name, protocol_number, protocol_date %}</p><p>{% trans 'RESPONSIBILITY', individual.last_name, individual.first_name, individual.middle_name, vars.full_abbr, vars.name %}</p><p>{% trans 'SIGNATURE_CERTIFIED', individual.last_name, individual.first_name, individual.middle_name %}</p><p>{% trans 'NON_TRANSFERABLE' %}</p><p>{% trans 'TERM_ONE_YEAR', valid_until %}</p><div class="signature"><p>{% trans 'PRINCIPAL_SIGNATURE', coop.chairman.last_name, coop.chairman.first_name, coop.chairman.middle_name %}</p><p>{% trans 'SIGNED_DIGITALLY' %}</p><p>{% trans 'SEAL' %}</p></div></div>`

export const translations = {
  ru: {
    POA_TITLE: 'Доверенность',
    POA_NUMBER: '№ {0}',
    PREAMBLE_INTRO: '{0} «{1}» в лице Председателя Совета {2} {3} {4}, действующего на основании Устава, настоящей доверенностью уполномочивает гражданина',
    PASSPORT_INLINE: 'паспорт серия: {0} № {1}, выдан: {2} {3}, к/п {4}, зарегистрирован: {5}',
    PREAMBLE_POWERS: 'действовать в лице Председателя Кооперативного участка «{0}» {1} «{2}», расположенного по адресу: {3} (далее — КУ), в соответствии с законодательством Российской Федерации и Уставом {4} «{5}», и представлять КУ в отношениях с другими юридическими лицами и гражданами, распоряжаться денежными средствами КУ в соответствии с Положением о кооперативном участке, утверждённым решением Собрания Совета {6} «{7}» (Протокол № {8} от {9}), вести переговоры, подготавливать документы, заключать договоры с правом подписи по сделкам КУ, а также совершать иные действия, связанные с выполнением настоящего поручения.',
    RESPONSIBILITY: 'Гражданин {0} {1} {2} несёт ответственность за все свои действия и деловые операции, осуществляемые в интересах {3} «{4}».',
    SIGNATURE_CERTIFIED: 'Подпись гражданина {0} {1} {2} удостоверяю.',
    NON_TRANSFERABLE: 'Полномочия по настоящей доверенности не могут быть переданы другим лицам.',
    TERM_ONE_YEAR: 'Доверенность выдана на срок один год, по {0} включительно.',
    PRINCIPAL_SIGNATURE: 'Подпись доверителя / Председатель Совета {0} {1} {2}',
    INN: 'ИНН',
    KPP: 'КПП',
    OGRN: 'ОГРН',
    SEAL: 'М.П.',
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
    chairman: {
      last_name: 'Петров',
      first_name: 'Пётр',
      middle_name: 'Петрович',
    },
  },
  meta: {
    created_at: '20.03.2024 12:00',
  },
  individual: {
    last_name: 'Иванов',
    first_name: 'Иван',
    middle_name: 'Иванович',
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
  poa_number: '7',
  protocol_number: '12',
  protocol_date: '18.11.2026',
  valid_until: '17.11.2027',
  branch_name: 'РОМАШКА',
  branch_address: 'г. Москва, ул. Кооперативная, д. 5',
  vars: {
    full_abbr: 'Потребительский кооператив',
    name: 'ВОСХОД',
    passport_request: 'yes',
  },
}
