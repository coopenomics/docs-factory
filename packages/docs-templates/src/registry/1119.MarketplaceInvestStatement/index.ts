import type { IGenerate, IMetaDocument } from '../../document'
import type { ICommonUser, ICooperativeData, IVars } from '../../model'

export const registry_id = 1119

/**
 * Заявление пайщика о трансляции паевого взноса из ЦПП «Цифровой Кошелёк» в
 * паевой взнос по договору участия в хозяйственной деятельности — паевой взнос
 * деньгами в кооперативный участок Стола заказов (задача 99D-29, PRD
 * инвестиционного этапа). Текст — рыба по словам владельца 07.11.2026;
 * окончательный даёт юрист.
 *
 * Подписывает пайщик до действия `marketplace::investmoney`: контракт
 * переводит сумму с главного паевого на кошелёк договора участия (o.mkt.inv, без
 * проводки) и публикует заявление в реестр документов (пакет — хэш паевого взноса).
 * Вёрстка — как у 1110 (инлайн-выравнивание, пустые строки под pre-wrap).
 */
export interface Action extends IGenerate {
  registry_id: number
  /** Идентификатор паевого взноса — хэш процесса в учёте. */
  invest_hash: string
  /** Кооперативный участок, в который вносятся деньги. */
  braname: string
  /** Название участка для текста документа. */
  branch_name: string
  /** Сумма трансляции с валютой. */
  amount: string
  /** Номер договора участия в хозяйственной деятельности по ЦПП «Стол заказов». */
  agreement_number: string
  /** Дата договора участия. */
  agreement_created_at: string
}

export type Meta = IMetaDocument & Action

export interface Model {
  meta: IMetaDocument
  coop: ICooperativeData
  vars: IVars
  user: ICommonUser
  invest_hash: string
  branch_name: string
  amount: string
  agreement_number: string
  agreement_created_at: string
}

export const title = 'Заявление о трансляции паевого взноса в договор участия в хозяйственной деятельности'
export const description = 'Заявление пайщика о трансляции паевого взноса из ЦПП «Цифровой Кошелёк» в паевой взнос по договору участия в хозяйственной деятельности кооперативного участка Стола заказов'

export const context = `<style>
h1 { margin: 0px; text-align: center; }
.digital-document { padding: 20px; }
.digital-document p { margin: 0 0 6px; }
.subheader { padding-bottom: 20px; }
</style>
<div class="digital-document">
  <div style="text-align: right">
    <p style="margin: 0">{% trans 'v_soviet' %} {{ vars.full_abbr_genitive }} "{{ vars.name }}"</p>
    <p style="margin: 0">{% trans 'from_member' %} {{ user.full_name_or_short_name }}</p>
  </div>
  <div style="text-align: center">
    <h1 class="header">{% trans 'statement_title' %}</h1>
    <p class="subheader">{% trans 'statement_subheader' %}</p>
  </div>
  <p>{% trans 'body', amount, agreement_number, agreement_created_at, branch_name %}</p>
  <p>{% trans 'signature' %}</p>
  <p>{{ user.full_name_or_short_name }}</p>
  <p>{{ created_at }}</p>
</div>
`

export const translations = {
  ru: {
    v_soviet: 'В Совет',
    from_member: 'от пайщика',
    statement_title: 'ЗАЯВЛЕНИЕ',
    statement_subheader: 'о трансляции паевого взноса в договор участия в хозяйственной деятельности',
    body: 'Прошу транслировать мой паевой взнос по Целевой Потребительской Программе «Цифровой Кошелёк» в сумме {0} в паевой взнос по Договору участия в хозяйственной деятельности № {1} от {2} для участия в хозяйственной деятельности кооперативного участка {3}.',
    signature: 'Подписано электронной подписью.',
  },
}

export const exampleData = {
  meta: { created_at: '07.11.2026 12:00' },
  coop: { short_name: 'ПК ВОСХОД', city: 'Москва' },
  vars: { name: 'ВОСХОД', full_abbr_genitive: 'Потребительского Кооператива' },
  user: { full_name_or_short_name: 'Иванов Иван Иванович' },
  invest_hash: '0000abcd...',
  branch_name: 'Коргашино',
  amount: '300000.00 RUB',
  agreement_number: 'A3F9C2D1',
  agreement_created_at: '07.11.2026',
}
