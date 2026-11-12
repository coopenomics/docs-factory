import type { ICommonUser, ICooperativeData, IVars } from '../../model'
import type { IDecisionData, IGenerate, IMetaDocument } from '../../document'

// Инвестиционный этап кооперативного участка Стола заказов (задача 99D-29):
// документ по образцу 1072 Благороста, имущество вносится в участок
// по договору участия в хозяйственной деятельности по ЦПП «Стол заказов».

export const registry_id = 1122

// Модель действия для генерации: позиция имущества из заявления 1070 и номер
// решения совета, которым взнос принят. Акт подписывают пайщик, затем председатель.
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
  decision_id: number
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
  decision: IDecisionData
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

export const title = 'Акт приёма-передачи имущества в кооперативный участок'
export const description = 'Форма акта приёма-передачи имущества, вносимого паевым взносом в кооперативный участок Стола заказов'

export const context = `<div class="digital-document"><div style="text-align: right"><p>{% trans 'appendix_number' %} {{ property_short_hash }}</p><p>{% trans 'appendix_to_agreement' %} № {{ agreement_number }}</p></div><div style="text-align: center"><h2>{% trans 'act_title' %} № АППИ-{{ property_short_hash }}</h2></div><div style="display: flex; justify-content: space-between;"><p>{% trans 'city_label' %} {{ coop.city }}</p><p>{% trans 'date_label' %} {{ created_at }}</p></div><p>{{ vars.full_abbr }} "{{ vars.name }}" {% trans 'hereinafter_society' %} {% trans 'in_face_of_chairman' %} {{ branch_name }} {{ branch_chairman_name }}, {% trans 'and_shareholder' %} {{ common_user.full_name_or_short_name }}, {% trans 'act_text' %} № {{ agreement_number }} {% trans 'from_date' %} {{ agreement_created_at }} {% trans 'branch_text' %} {{ branch_name }}, {% trans 'statement_text' %} № ЗПВИ-{{ property_short_hash }} {% trans 'and_protocol' %} № {{ decision.id }} {% trans 'from_date' %} {{ decision.date }} {% trans 'following_property' %}:</p><table><tr><th>{% trans 'number_pp' %}</th><td>1</td></tr><tr><th>{% trans 'name_details' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'description' %}</th><td>{{ property_description }}</td></tr><tr><th>{% trans 'property_form' %}</th><td>{% if property_form_label %}{{ property_form_label }}{% else %}{% trans 'property_form_text' %}{% endif %}</td></tr><tr><th>{% trans 'unit' %}</th><td>{{ property_unit }}</td></tr><tr><th>{% trans 'quantity' %}</th><td>{{ property_quantity }}</td></tr><tr><th>{% trans 'total_cost' %}</th><td>{{ property_amount }}</td></tr><tr style="font-weight: bold;"><th>{% trans 'total' %}</th><td>{{ property_quantity }} {{ property_unit }} / {{ property_amount }}</td></tr></table><p>{% trans 'property_condition' %}.</p><p>{% trans 'no_claims_quality' %}.</p><div style="margin-top: 40px;"><p><strong>{% trans 'transferred' %}:</strong></p><p>{% trans 'shareholder' %}: {{ common_user.full_name_or_short_name }}</p><p>{% trans 'signed_by_digital_signature' %}</p></div><div style="margin-top: 40px;"><p><strong>{% trans 'received' %}:</strong></p><p>{% trans 'chairman_title' %} {{ branch_name }}</p><p>{{ vars.short_abbr }} "{{ vars.name }}"</p><p>{{ branch_chairman_name }}</p><p>{% trans 'signed_by_digital_signature' %}</p></div></div><style>.digital-document {padding: 20px;white-space: pre-wrap;}table {width: 100%;border-collapse: collapse;margin-top: 20px;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;word-break: break-all;vertical-align: top;}th {background-color: #f4f4f4;width: 30%;font-weight: bold;}</style>`

export const translations = {
  ru: {
    act_title: 'АКТ ПРИЁМА-ПЕРЕДАЧИ ИМУЩЕСТВА',
    appendix_number: 'Приложение №',
    appendix_to_agreement: 'к ДОГОВОРУ об участии в хозяйственной деятельности',
    city_label: 'г.',
    date_label: 'Дата:',
    hereinafter_society: '(далее "Общество")',
    in_face_of_chairman: 'в лице председателя кооперативного участка',
    and_shareholder: 'и Пайщик',
    act_text: 'составили настоящий Акт о том, что Пайщик передал, а Общество получило от Пайщика паевой взнос Имуществом в соответствии с условиями Договора об участии в хозяйственной деятельности',
    from_date: 'от',
    branch_text: 'по ЦПП «Стол заказов» для участия в хозяйственной деятельности кооперативного участка',
    statement_text: 'заявлением Пайщика',
    and_protocol: 'и Протоколом Совета',
    following_property: 'следующее Имущество',
    number_pp: '№ п/п',
    name_details: 'Наименование/Реквизиты',
    description: 'Описание',
    property_form: 'Форма имущества',
    property_form_text: 'Имущество в натуральной форме',
    unit: 'Ед. изм.',
    quantity: 'Количество',
    total_cost: 'Стоимость Всего',
    total: 'ИТОГО',
    property_condition: 'Имущество передано в состоянии, указанном в настоящем Акте, и принимается Обществом по стоимости, утверждённой решением Совета',
    no_claims_quality: 'Претензий по качеству и комплектности Имущества Общество не имеет',
    transferred: 'ПЕРЕДАНО',
    shareholder: 'Пайщик',
    signed_by_digital_signature: 'Подписано электронной подписью',
    received: 'ПОЛУЧЕНО',
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
    full_abbr: 'Потребительский кооператив',
    short_abbr: 'ПК',
  },
  common_user: {
    full_name_or_short_name: 'Иванов Иван Иванович',
  },
  coop: {
    city: 'Москва',
    chairman: {
      first_name: 'Алексей',
      last_name: 'Муравьев',
      middle_name: 'Николаевич',
    },
  },
  decision: {
    date: '11.04.2024',
    id: '1',
  },
}
