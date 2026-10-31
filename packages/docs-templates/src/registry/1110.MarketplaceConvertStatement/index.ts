import type { IGenerate, IMetaDocument } from '../../document'
import type { ICommonProgram, ICommonUser, ICooperativeData, IVars } from '../../model'

export const registry_id = 1110

/**
 * Заявление пайщика о трансляции паевого взноса из ЦПП «Цифровой Кошелёк» в
 * ЦПП «Стол заказов» (задача 99D-18, решение владельца 31.10.2026). Текст —
 * слова владельца, оформление по образцу заявления 1090: «Прошу транслировать
 * мой паевой взнос по Целевой Потребительской Программе «Цифровой Кошелёк» в
 * сумме {amount} в Целевую Потребительскую Программу «Стол заказов»».
 *
 * Всё, что пайщик вносит под заказ, остаётся паевым взносом: и тело заказа, и
 * обеспечительная часть. Заявление пишется только на то, чего не хватает на
 * свободном паевом «Стола заказов» `w.mkt.share`: {amount} — недостающая часть
 * тела и обеспечительной части. Подписывается до заказа: действие
 * `marketplace::convert` транслирует сумму на `w.mkt.share` (o.mkt.conv, без
 * проводки), контракт публикует заявление в реестр документов
 * самостоятельным пакетом (package = hash).
 *
 * Поле `membership_fee` — обеспечительная часть в сумме трансляции. В текст
 * оно не выводится; форма модели сохранена до новой редакции шаблона, чтобы не
 * менять мажорную версию сборщика.
 */
export interface Action extends IGenerate {
  registry_id: number
  /** Якорь заявления: хеш оформления, бандла или заказа, к которому относится перевод. */
  order_hash: string
  /** Сумма трансляции с Цифрового кошелька: недостающая часть тела и обеспечительной части, с валютой. */
  amount: string
  /** Обеспечительная часть в сумме трансляции, с валютой. В текст заявления не выводится. */
  membership_fee: string
}

export type Meta = IMetaDocument & Action

/**
 * Модель данных для PDF-рендера Заявления о конвертации.
 * Подписант — пайщик-заказчик.
 */
export interface Model {
  meta: IMetaDocument
  coop: ICooperativeData
  vars: IVars
  user: ICommonUser
  program: ICommonProgram
  order_hash: string
  amount: string
  membership_fee: string
}

export const title = 'Заявление о трансляции паевого взноса в ЦПП «Стол заказов»'
export const description = 'Заявление пайщика о трансляции паевого взноса из ЦПП «Цифровой Кошелёк» в ЦПП «Стол заказов»'

// Вёрстка 1-в-1 с эталоном фабричного документа 1106/1109, которые КОРРЕКТНО
// отображаются и в повестке совета (рендерер BaseDocument), и в предпросмотре.
// BaseDocument прогоняет html через sanitizeHtml — он ВЫРЕЗАЕТ содержимое
// <style> документа (инлайн-стили выживают, блочные правила — нет) и форсит в
// Shadow DOM `.digital-document { white-space: pre-wrap }`. Поэтому:
// выравнивание — ИНЛАЙН (`style="text-align: ..."`, а не класс в <style>),
// вертикальный ритм — ПУСТЫМИ СТРОКАМИ под pre-wrap (не margin'ами), плотные
// абзацы внутри одного блока (шапка «В Совет»/«от пайщика», подпись) — одной
// строкой переноса без пустой строки между ними. Свой <style> ниже нужен
// только для нешадоу-рендеров (weasyprint, предпросмотр без BaseDocument).
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

  <p>{% trans 'body', program.name, amount %}</p>

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
    statement_subheader: 'о трансляции паевого взноса',
    body: 'Прошу транслировать мой паевой взнос по Целевой Потребительской Программе «Цифровой Кошелёк» в сумме {1} в Целевую Потребительскую Программу «{0}».',
    signature: 'Подписано электронной подписью.',
  },
}

export const exampleData = {
  meta: { created_at: '12.06.2026 12:00' },
  coop: {
    short_name: 'ПК ВОСХОД',
    city: 'Москва',
  },
  vars: {
    name: 'ВОСХОД',
    full_abbr_genitive: 'Потребительского Кооператива',
  },
  user: { full_name_or_short_name: 'Иванов Иван Иванович' },
  program: { name: 'СТОЛ ЗАКАЗОВ' },
  order_hash: '0000abcd...',
  amount: '910.00 RUB',
  membership_fee: '210.00 RUB',
}
