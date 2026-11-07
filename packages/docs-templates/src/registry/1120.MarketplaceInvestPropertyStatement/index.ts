import type { ICommonUser, ICooperativeData, IVars } from '../../model'
import type { IGenerate, IMetaDocument } from '../../document'

// Инвестиционный этап кооперативного участка Стола заказов (задача 99D-29):
// документ по образцу 1070 Благороста, имущество вносится в участок
// по договору участия в хозяйственной деятельности по ЦПП «Стол заказов».

export const registry_id = 1120

// Модель действия для генерации. Одно заявление — одна позиция имущества
// (решение владельца 30.10.2026); оценку называет пайщик.
export interface Action extends IGenerate {
  registry_id: number
  /** Кооперативный участок, в который вносится имущество. */
  braname: string
  /** Название участка для текста документа. */
  branch_name: string
  /** ФИО председателя участка: он одобряет заявление и принимает имущество. */
  branch_chairman_name: string
  /** Номер договора участия в хозяйственной деятельности по ЦПП «Стол заказов». */
  agreement_number: string
  /** Дата договора участия. */
  agreement_created_at: string
  /**
   * Форма имущества: `thing` — вещь, `intangible` — нематериальное имущество
   * (документ, методика, файл). Поле появилось со сборщиком 1.2; документы
   * без него выводят прежний текст «Имущество в натуральной форме».
   */
  property_form?: string
  property_hash: string
  property_name: string
  property_description: string
  property_quantity: string
  property_unit: string
  property_amount: string
}

export type Meta = IMetaDocument & Action

// Модель данных документа
export interface Model {
  meta: IMetaDocument
  branch_name: string
  branch_chairman_name: string
  coop: ICooperativeData
  vars: IVars
  common_user: ICommonUser
  agreement_number: string
  agreement_created_at: string
  property_hash: string
  property_short_hash: string
  property_form?: string
  property_form_label?: string
  property_name: string
  property_description: string
  property_quantity: string
  property_unit: string
  property_amount: string
}

export const title = 'Заявление о паевом взносе имуществом в кооперативный участок'
export const description = 'Заявление пайщика о внесении паевого взноса имуществом в кооперативный участок Стола заказов'

export const context = `<div class="digital-document"><div style="text-align: right"><p>{% trans 'appendix_title' %} № {{ property_short_hash }}</p><p>{% trans 'to_agreement' %} № {{ agreement_number }}</p><p>{% trans 'to_council' %} {{ vars.full_abbr_genitive }} "{{ vars.name }}"</p><p>{% trans 'from_shareholder' %} {{ common_user.full_name_or_short_name }}</p></div><div style="text-align: center"><h2>{% trans 'statement_title' %} № ЗПВИ-{{ property_short_hash }}</h2></div><p>{% trans 'statement_text' %} № {{ agreement_number }} {% trans 'from_date' %} {{ agreement_created_at }} {% trans 'branch_text' %} {{ branch_name }}, {% trans 'request_contribution' %}:</p><table><tr><th>{% trans 'property_name' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'property_form' %}</th><td>{% if property_form_label %}{{ property_form_label }}{% else %}{% trans 'property_form_text' %}{% endif %}</td></tr><tr><th>{% trans 'description' %}</th><td>{{ property_description }}</td></tr><tr><th>{% trans 'purpose' %}</th><td>{% trans 'purpose_text' %} № {{ agreement_number }}</td></tr></table><table><tr><th>{% trans 'number_pp' %}</th><td>1</td></tr><tr><th>{% trans 'name_details' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'unit' %}</th><td>{{ property_unit }}</td></tr><tr><th>{% trans 'quantity' %}</th><td>{{ property_quantity }}</td></tr><tr><th>{% trans 'total_cost' %}</th><td>{{ property_amount }}</td></tr><tr style="font-weight: bold;"><th>{% trans 'total' %}</th><td>{{ property_quantity }} {{ property_unit }} / {{ property_amount }}</td></tr></table><p>{% trans 'property_confirmation' %}.</p><p>{% trans 'shareholder' %}: {{ common_user.full_name_or_short_name }}</p><p>{{ created_at }}</p><p>{% trans 'signed_by_digital_signature' %}</p><p style="margin-top: 30px;">{% trans 'accepted' %}</p><p>{% trans 'signed_by_digital_signature' %}</p><p>{% trans 'chairman_title' %} {{ branch_name }}</p><p>{{ branch_chairman_name }}</p></div><style>.digital-document {padding: 20px;white-space: pre-wrap;}table {width: 100%;border-collapse: collapse;margin-top: 20px;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;word-break: break-all;vertical-align: top;}th {background-color: #f4f4f4;width: 30%;font-weight: bold;}</style>`

export const translations = {
  ru: {
    appendix_title: 'Приложение',
    to_agreement: 'к ДОГОВОРУ об участии в хозяйственной деятельности',
    to_council: 'В Совет',
    from_shareholder: 'от Пайщика',
    statement_title: 'ЗАЯВЛЕНИЕ',
    statement_text: 'В соответствии с условиями Договора об участии в хозяйственной деятельности',
    from_date: 'от',
    branch_text: 'по ЦПП «Стол заказов» для участия в хозяйственной деятельности кооперативного участка',
    request_contribution: 'прошу принять от меня Паевой взнос в Общество следующим Имуществом',
    property_name: 'Наименование/ название',
    property_form: 'Форма Имущества',
    property_form_text: 'Имущество в натуральной форме',
    description: 'Описание, характеристики и состояние',
    purpose: 'Назначение',
    purpose_text: 'В целях реализации Предмета Договора об участии в хозяйственной деятельности',
    number_pp: '№ п/п',
    name_details: 'Наименование/Реквизиты',
    unit: 'Ед. изм.',
    quantity: 'Количество',
    total_cost: 'Стоимость Всего',
    total: 'ИТОГО',
    property_confirmation: 'Я подтверждаю, что Имущество, которое я вношу паевым взносом в Общество, принадлежит мне на праве собственности, а нематериальное Имущество — на исключительном праве, в споре и под арестом не состоит',
    shareholder: 'Пайщик',
    signed_by_digital_signature: 'Подписано электронной подписью',
    accepted: 'ОДОБРЕНО',
    chairman_title: 'Председатель кооперативного участка',
  },
}

export const exampleData = {
  meta: {
    created_at: '11.04.2024 12:00',
  },
  agreement_number: 'A3F9C2D1',
  agreement_created_at: '11.04.2024',
  branch_name: 'Коргашино',
  branch_chairman_name: 'Петров Пётр Петрович',
  property_hash: 'b7e1c0a4f3d2e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
  property_short_hash: 'b7e1c0a4',
  property_name: 'Холодильная витрина Polair',
  property_description: 'Серийный номер 23B0418, 2024 года выпуска, исправна',
  property_quantity: '1',
  property_unit: 'шт.',
  property_amount: '85000.00 RUB',
  vars: {
    name: 'ВОСХОД',
    full_abbr_genitive: 'Потребительского Кооператива',
    short_abbr: 'ПК',
  },
  common_user: {
    full_name_or_short_name: 'Иванов Иван Иванович',
  },
  coop: {
    chairman: {
      first_name: 'Алексей',
      last_name: 'Муравьев',
      middle_name: 'Николаевич',
    },
  },
}
