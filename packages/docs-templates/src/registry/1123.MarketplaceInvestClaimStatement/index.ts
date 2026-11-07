import type { IGenerate, IMetaDocument } from '../../document'
import type { ICommonUser, ICooperativeData, IVars } from '../../model'

export const registry_id = 1123

/**
 * Заявление инициатора о трансляции средств с кошелька договора участия в
 * хозяйственной деятельности на главный паевой кошелёк ЦПП «Цифровой Кошелёк»
 * (задача 99D-29, PRD инвестиционного этапа). Текст — рыба по словам
 * владельца 07.11.2026; окончательный даёт юрист.
 *
 * Сумму в документ подставляет ИСТОК из предпросмотра: возвращённое из
 * экономии участка и неиспользованное, когда использованное возвращено.
 * Контракт (`marketplace::claiminv`) считает сумму сам и проверяет подпись
 * заявления. Вёрстка — как у 1110.
 */
export interface Action extends IGenerate {
  registry_id: number
  /** Идентификатор заявления — хэш процесса в учёте. */
  claim_hash: string
  /** Кооперативный участок, из вложений в который забираются средства. */
  braname: string
  /** Название участка для текста документа. */
  branch_name: string
  /** Сумма трансляции с валютой (предпросмотр; контракт считает сам). */
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
  claim_hash: string
  branch_name: string
  amount: string
  agreement_number: string
  agreement_created_at: string
}

export const title = 'Заявление о трансляции средств с кошелька договора участия на главный паевой кошелёк'
export const description = 'Заявление инициатора кооперативного участка о трансляции возвращённого вложения с кошелька договора участия в хозяйственной деятельности на главный паевой кошелёк ЦПП «Цифровой Кошелёк»'

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
  <p>{% trans 'body', agreement_number, agreement_created_at, branch_name, amount %}</p>
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
    statement_subheader: 'о трансляции средств на главный паевой кошелёк',
    body: 'Прошу транслировать мои средства с кошелька Договора участия в хозяйственной деятельности № {0} от {1} по кооперативному участку {2} в сумме {3} на главный паевой кошелёк Целевой Потребительской Программы «Цифровой Кошелёк».',
    signature: 'Подписано электронной подписью.',
  },
}

export const exampleData = {
  meta: { created_at: '07.11.2026 12:00' },
  coop: { short_name: 'ПК ВОСХОД', city: 'Москва' },
  vars: { name: 'ВОСХОД', full_abbr_genitive: 'Потребительского Кооператива' },
  user: { full_name_or_short_name: 'Иванов Иван Иванович' },
  claim_hash: '0000abcd...',
  branch_name: 'Коргашино',
  amount: '42000.00 RUB',
  agreement_number: 'A3F9C2D1',
  agreement_created_at: '07.11.2026',
}
