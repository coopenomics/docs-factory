import type { ICommonUser, ICooperativeData, IVars } from '../../model'
import type { IDecisionData, IGenerate, IMetaDocument } from '../../document'

export const registry_id = 1072

// Модель действия для генерации: позиция имущества из заявления 1070 и номер
// решения совета, которым взнос принят. Акт подписывают пайщик, затем председатель.
export interface Action extends IGenerate {
  registry_id: number
  decision_id: number
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
  coop: ICooperativeData
  vars: IVars
  decision: IDecisionData
  common_user: ICommonUser
  contributor_contract_number: string
  contributor_contract_created_at: string
  blagorost_agreement_number: string
  blagorost_agreement_created_at: string
  property_hash: string
  property_short_hash: string
  property_name: string
  property_description: string
  property_quantity: string
  property_unit: string
  property_amount: string
}

export const title = 'Акт приёма-передачи имущества в программу «Благорост»'
export const description = 'Форма акта приёма-передачи имущества, вносимого паевым взносом по целевой потребительской программе «Благорост»'

export const context = `<div class="digital-document"><div style="text-align: right"><p>{% trans 'appendix_number' %} {{ property_short_hash }}</p><p>{% trans 'appendix_to_agreement' %} № {{ contributor_contract_number }}</p></div><div style="text-align: center"><h2>{% trans 'act_title' %} № АППИ-{{ property_short_hash }}</h2></div><div style="display: flex; justify-content: space-between;"><p>{% trans 'city_label' %} {{ coop.city }}</p><p>{% trans 'date_label' %} {{ created_at }}</p></div><p>{{ vars.full_abbr }} "{{ vars.name }}" {% trans 'hereinafter_society' %} {% trans 'in_face_of_chairman' %} {{ coop.chairman.last_name }} {{ coop.chairman.first_name }} {{ coop.chairman.middle_name }}, {% trans 'and_shareholder' %} {{ common_user.full_name_or_short_name }}, {% trans 'act_text' %} № {{ contributor_contract_number }} {% trans 'from_date' %} {{ contributor_contract_created_at }} {% trans 'and_appendix' %} №{{ blagorost_agreement_number }} {% trans 'from_date' %} {{ blagorost_agreement_created_at }} {% trans 'blagorost_program_text' %}, {% trans 'statement_text' %} № ЗПВИ-{{ property_short_hash }} {% trans 'and_protocol' %} № {{ decision.id }} {% trans 'from_date' %} {{ decision.date }} {% trans 'following_property' %}:</p><table><tr><th>{% trans 'number_pp' %}</th><td>1</td></tr><tr><th>{% trans 'name_details' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'description' %}</th><td>{{ property_description }}</td></tr><tr><th>{% trans 'property_form' %}</th><td>{% trans 'property_form_text' %}</td></tr><tr><th>{% trans 'unit' %}</th><td>{{ property_unit }}</td></tr><tr><th>{% trans 'quantity' %}</th><td>{{ property_quantity }}</td></tr><tr><th>{% trans 'total_cost' %}</th><td>{{ property_amount }}</td></tr><tr style="font-weight: bold;"><th>{% trans 'total' %}</th><td>{{ property_quantity }} {{ property_unit }} / {{ property_amount }}</td></tr></table><p>{% trans 'property_condition' %}.</p><p>{% trans 'no_claims_quality' %}.</p><div style="margin-top: 40px;"><p><strong>{% trans 'transferred' %}:</strong></p><p>{% trans 'shareholder' %}: {{ common_user.full_name_or_short_name }}</p><p>{% trans 'signed_by_digital_signature' %}</p></div><div style="margin-top: 40px;"><p><strong>{% trans 'received' %}:</strong></p><p>{% trans 'chairman_title' %}</p><p>{{ vars.short_abbr }} "{{ vars.name }}"</p><p>{{ coop.chairman.last_name }} {{ coop.chairman.first_name }} {{ coop.chairman.middle_name }}</p><p>{% trans 'signed_by_digital_signature' %}</p></div></div><style>.digital-document {padding: 20px;white-space: pre-wrap;}table {width: 100%;border-collapse: collapse;margin-top: 20px;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;word-break: break-all;vertical-align: top;}th {background-color: #f4f4f4;width: 30%;font-weight: bold;}</style>`

export const translations = {
  ru: {
    act_title: 'АКТ ПРИЁМА-ПЕРЕДАЧИ ИМУЩЕСТВА',
    appendix_number: 'Приложение №',
    appendix_to_agreement: 'к ДОГОВОРУ об участии в хозяйственной деятельности',
    city_label: 'г.',
    date_label: 'Дата:',
    hereinafter_society: '(далее "Общество")',
    in_face_of_chairman: 'в лице Председателя Совета Общества',
    and_shareholder: 'и Пайщик',
    act_text: 'составили настоящий Акт о том, что Пайщик передал, а Общество получило от Пайщика паевой взнос Имуществом в соответствии с условиями Договора об участии в хозяйственной деятельности',
    from_date: 'от',
    and_appendix: 'и его Приложением',
    blagorost_program_text: 'о соглашении по присоединению к целевой потребительской программе "БЛАГОРОСТ"',
    statement_text: 'заявлением Пайщика',
    and_protocol: 'и Протоколом Совета',
    following_property: 'следующее Имущество',
    number_pp: '№ п/п',
    name_details: 'Наименование/Реквизиты',
    description: 'Описание, характеристики и состояние',
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
    chairman_title: 'Председатель Совета',
  },
}

export const exampleData = {
  meta: {
    created_at: '11.04.2024 12:00',
  },
  contributor_contract_number: 'ED3BCFC5B681AA83D',
  contributor_contract_created_at: '11.04.2024',
  blagorost_agreement_number: 'ed3bcfd5b681aa83d',
  blagorost_agreement_created_at: '11.04.2024',
  property_hash: 'b7e1c0a4f3d2e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
  property_short_hash: 'b7e1c0a4',
  property_name: 'Ноутбук Lenovo ThinkPad T14',
  property_description: 'Серийный номер PF3XK2LM, 2023 года выпуска, исправен, с зарядным устройством',
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
