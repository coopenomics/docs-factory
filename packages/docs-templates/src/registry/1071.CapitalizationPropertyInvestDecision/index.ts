import type { IDecisionData, IGenerate, IMetaDocument } from '../../document'
import type { ICommonUser, ICooperativeData, IVars } from '../../model'

export const registry_id = 1071

// Модель действия для генерации: поля заявления 1070 плюс номер решения совета.
// Робот совета собирает протокол из полей заявления, поэтому имена полей совпадают.
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

export const title = 'Протокол решения совета о приёме паевого взноса имуществом в программу «Благорост»'
export const description = 'Форма протокола решения совета о приёме паевого взноса имуществом по целевой потребительской программе «Благорост»'

export const context = `<style>h1 {margin: 0px;text-align:center;}h3{margin: 0px;padding-top: 15px;}.about {padding: 20px;}.about p{margin: 0px;}.signature {padding-top: 20px;}.digital-document {padding: 20px;white-space: pre-wrap;}.subheader {padding-bottom: 20px;}table {width: 100%;border-collapse: collapse;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;word-break: break-all;}th {background-color: #f4f4f4;width: 30%;font-weight: bold;}.property-table {margin-top: 20px;}.property-table th {width: auto;}</style><div class="digital-document"><h1 class="header">{% trans 'protocol_number', decision.id %}</h1><p style="text-align:center" class="subheader">{% trans 'council_meeting_name' %} {{ vars.full_abbr_genitive }} "{{ vars.name }}"</p><p style="text-align: right"> {{ created_at }}, {{ coop.city }}</p><table class="about"><tbody><tr><th>{% trans 'meeting_format' %}</th><td>{% trans 'meeting_format_value' %}</td></tr><tr><th>{% trans 'meeting_place' %}</th><td>{{ coop.full_address }}</td></tr><tr><th>{% trans 'meeting_date' %}</th><td>{{ decision.date }}</td></tr><tr><th>{% trans 'opening_time' %}</th><td>{{ decision.time }}</td></tr></tbody></table><h3>{% trans 'council_members' %}</h3><table><tbody>{% for member in coop.members %}<tr><th>{% if member.is_chairman %}{% trans 'chairman_of_the_council' %}{% else %}{% trans 'member_of_the_council' %}{% endif %}</th><td>{{ member.last_name }} {{ member.first_name }} {{ member.middle_name }}</td></tr>{% endfor %}</tbody></table><h3>{% trans 'meeting_legality' %}</h3><p>{% trans 'voting_results', decision.voters_percent %} {% trans 'quorum' %} {% trans 'chairman_of_the_meeting', coop.chairman.last_name, coop.chairman.first_name, coop.chairman.middle_name %}.</p><h3>{% trans 'agenda' %}</h3><table><tbody><tr><th>№</th><td>{% trans 'question' %}</td></tr><tr><th>1</th><td>{% trans 'agenda_text', common_user.full_name_or_short_name, property_short_hash, contributor_contract_number, contributor_contract_created_at, blagorost_agreement_number, blagorost_agreement_created_at %}</td></tr></tbody></table><h3>{% trans 'hearing' %}</h3><p>{% trans 'hearing_text', coop.chairman.last_name, coop.chairman.first_name, coop.chairman.middle_name, common_user.full_name_or_short_name, property_short_hash, contributor_contract_number, contributor_contract_created_at, blagorost_agreement_number, blagorost_agreement_created_at %}.</p><h3>{% trans 'voting' %}</h3><p>{% trans 'vote_results' %}</p><table><tbody><tr><th>{% trans 'votes_for' %}</th><td>{{ decision.votes_for }}</td></tr><tr><th>{% trans 'votes_against' %}</th><td>{{ decision.votes_against }}</td></tr><tr><th>{% trans 'votes_abstained' %}</th><td>{{ decision.votes_abstained }}</td></tr></tbody></table><h3>{% trans 'decision_made' %}</h3><p>1. {% trans 'decision_text_simple', common_user.full_name_or_short_name, property_short_hash, contributor_contract_number, contributor_contract_created_at, blagorost_agreement_number, blagorost_agreement_created_at %}</p><table class="property-table"><tr><th>{% trans 'property_name' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'property_form' %}</th><td>{% trans 'property_form_text' %}</td></tr><tr><th>{% trans 'description' %}</th><td>{{ property_description }}</td></tr><tr><th>{% trans 'purpose' %}</th><td>{% trans 'purpose_text' %} № {{ contributor_contract_number }}</td></tr></table><table class="property-table"><tr><th>{% trans 'number_pp' %}</th><td>1</td></tr><tr><th>{% trans 'name_details' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 'unit' %}</th><td>{{ property_unit }}</td></tr><tr><th>{% trans 'quantity' %}</th><td>{{ property_quantity }}</td></tr><tr><th>{% trans 'total_cost' %}</th><td>{{ property_amount }}</td></tr><tr style="font-weight: bold;"><th>{% trans 'total' %}</th><td>{{ property_quantity }} {{ property_unit }} / {{ property_amount }}</td></tr></table><hr><p>{% trans 'closing_time', decision.time %}</p><div class="signature"><p>{% trans 'signature' %}</p><p>{% trans 'chairman' %} {{ coop.chairman.last_name }} {{ coop.chairman.first_name }} {{ coop.chairman.middle_name }}</p></div></div>`

export const translations = {
  ru: {
    meeting_format: 'Форма',
    meeting_date: 'Дата',
    meeting_place: 'Место',
    opening_time: 'Время открытия',
    council_members: 'ЧЛЕНЫ СОВЕТА',
    voting_results: 'Количество голосов составляет {0}% от общего числа членов Совета.',
    meeting_legality: 'СОБРАНИЕ ПРАВОМОЧНО',
    chairman_of_the_meeting: 'Председатель собрания совета: {0} {1} {2}',
    agenda: 'ПОВЕСТКА ДНЯ',
    vote_results: 'По первому вопросу повестки дня проголосовали:',
    decision_made: 'РЕШИЛИ',
    closing_time: 'Время закрытия собрания совета: {0}.',
    protocol_number: 'ПРОТОКОЛ № {0}',
    council_meeting_name: 'Собрания Совета',
    chairman_of_the_council: 'Председатель совета',
    signature: 'Документ подписан электронной подписью.',
    chairman: 'Председатель',
    quorum: 'Кворум для решения поставленных на повестку дня вопросов имеется.',
    voting: 'ГОЛОСОВАНИЕ',
    meeting_format_value: 'Заочная',
    member_of_the_council: 'Член совета',
    question: 'Вопрос',
    votes_for: 'ЗА',
    votes_against: 'ПРОТИВ',
    votes_abstained: 'ВОЗДЕРЖАЛСЯ',
    hearing: 'СЛУШАЛИ',
    agenda_text: 'Заявление пайщика {0} № ЗПВИ-{1} на внесение паевого взноса Имуществом в соответствии с условиями Договора об участии в хозяйственной деятельности № {2} от {3} и его Приложением №{4} от {5} о соглашении по присоединению к целевой потребительской программе "БЛАГОРОСТ".',
    hearing_text: '{0} {1} {2} с предложением принять паевой взнос Имуществом от пайщика {3} согласно его заявления № ЗПВИ-{4} в соответствии с условиями Договора об участии в хозяйственной деятельности № {5} от {6} и его Приложением №{7} от {8} о соглашении по присоединению к целевой потребительской программе "БЛАГОРОСТ". Пайщик {3} подтверждает, что заявленное к взносу Имущество принадлежит ему на праве собственности, в споре и под арестом не состоит',
    decision_text_simple: 'Принять паевой взнос Имуществом от пайщика {0} согласно его заявления № ЗПВИ-{1} в соответствии с условиями Договора об участии в хозяйственной деятельности № {2} от {3} и его Приложением №{4} от {5} о соглашении по присоединению к целевой потребительской программе "БЛАГОРОСТ"',
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
    full_abbr_genitive: 'Потребительского Кооператива',
  },
  common_user: {
    full_name_or_short_name: 'Иванов Иван Иванович',
  },
  coop: {
    full_address: '117593, г. МОСКВА, ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ ЯСЕНЕВО, ПРОЕЗД СОЛОВЬИНЫЙ, Д. 1, ПОМЕЩ. 1/1',
    chairman: {
      first_name: 'Алексей',
      last_name: 'Муравьев',
      middle_name: 'Николаевич',
    },
    city: 'Москва',
  },
  decision: {
    time: '12:00',
    date: '11.04.2024',
    votes_for: '3',
    votes_against: '0',
    votes_abstained: '0',
    voters_percent: '100',
    id: '1',
  },
}
