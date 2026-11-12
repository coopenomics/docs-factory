import type { ICommonUser, ICooperativeData, IVars } from '../../model'
import type { IDecisionData, IGenerate, IMetaDocument } from '../../document'

// Инвестиционный этап кооперативного участка Стола заказов (задачи 99D-29, 99D-35).
// Текст — дословно Приложение № 2 к документу владельца «Договор УХД_ИНВЕСТ_ПВЗ_КУ»
// (12.11.2026); пропуски бланка заменены подстановками.

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
  /** Поля бланка владельца 12.11.2026 (сборщик 1.1; 1.0 их не заполняет). */
  property_category?: string
  property_media_links?: string
  property_warranty_terms?: string
  property_other?: string
  /** Стоимость единицы — сумма, делённая на количество; считает узел. */
  property_unit_cost?: string
  /** Срок Гарантийных обязательств в днях. */
  property_warranty_days?: string
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
  property_category?: string
  property_media_links?: string
  property_warranty_terms?: string
  property_other?: string
  property_unit_cost?: string
  property_warranty_days?: string
}

export const title = 'Акт приёма-передачи имущества в кооперативный участок'
export const description = 'Форма акта приёма-передачи имущества, вносимого паевым взносом в кооперативный участок Стола заказов'

export const context = `<div class="digital-document"><div style="text-align: right"><p>{% trans 't1' %}</p><p>{% trans 't2' %}{{ agreement_number }}</p></div><div style="text-align: center"><h2>{% trans 't3' %}{{ property_short_hash }}</h2><p>{% trans 't4' %}{{ agreement_number }}{% trans 't5' %}{{ agreement_created_at }}</p></div><div style="display: flex; justify-content: space-between;"><p>{% trans 't6' %}{{ coop.city }}</p><p>{% trans 't7' %}{{ created_at }}</p></div><p>{% trans 't8' %}{{ vars.name }}{% trans 't9' %}{{ coop.chairman.last_name }}{% trans 't10' %}{{ coop.chairman.first_name }}{% trans 't11' %}{{ coop.chairman.middle_name }}{% trans 't12' %}{{ common_user.full_name_or_short_name }}{% trans 't13' %}{{ agreement_number }}{% trans 't14' %}{{ agreement_created_at }}{% trans 't15' %}{{ decision.id }}{% trans 't16' %}{{ decision.date }}{% trans 't17' %}</p><table class="grid"><tr><th>{% trans 't18' %}</th><th>{% trans 't19' %}</th><th>{% trans 't20' %}</th><th>{% trans 't21' %}</th><th>{% trans 't22' %}</th><th>{% trans 't23' %}</th><th>{% trans 't24' %}</th></tr><tr><td>1</td><td>{{ property_name }}</td><td>{% trans 'property_form_material' %}</td><td>{{ property_unit }}</td><td>{{ property_quantity }}</td><td>{{ property_unit_cost }}</td><td>{{ property_amount }}</td></tr><tr><td></td><td>{% trans 't25' %}</td><td></td><td></td><td></td><td></td><td>{{ property_amount }}</td></tr></table><p>{% trans 't26' %}{{ agreement_number }}{% trans 't27' %}{{ agreement_created_at }}{% trans 't28' %}{{ property_warranty_days }}{% trans 't29' %}</p><div style="margin-top: 30px;"><p>{% trans 't30' %}{{ common_user.full_name_or_short_name }}</p><p>{% trans 't31' %}</p></div><div style="margin-top: 30px;"><p>{% trans 't32' %}{{ coop.chairman.last_name }}{% trans 't33' %}{{ coop.chairman.first_name }}{% trans 't34' %}{{ coop.chairman.middle_name }}</p><p>{% trans 't35' %}</p></div></div><style>.digital-document {padding: 20px;white-space: pre-wrap;}table {width: 100%;border-collapse: collapse;margin-top: 20px;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;vertical-align: top;}th {width: 30%;font-weight: bold;}.grid th {width: auto;}</style>`

export const translations = {
  ru: {
    // Форма имущества в акте — слово владельца 12.11.2026.
    property_form_material: 'Материальный объект',
    t1: 'Приложение №2 ',
    t2: 'к ДОГОВОРУ о совместной хозяйственной деятельности № ',
    t3: 'АКТ № АППИ-',
    t4: 'приема-передачи Имущества в соответствии с условиями Договора об участии в хозяйственной деятельности № ',
    t5: ' от ',
    t6: 'г. ',
    t7: 'Дата: ',
    t8: 'ПОТРЕБИТЕЛЬСКИЙ КООПЕРАТИВ "',
    t9: '" (далее “Общество”) в лице Председателя Совета ',
    t10: ' ',
    t11: ' ',
    t12: ', и Пайщик ',
    t13: ', составили настоящий Акт о том, что Пайщик передал, а Кооператив получил от Пайщика, в соответствии с условиями Договора об участии в хозяйственной деятельности № ',
    t14: ' от ',
    t15: ' и Протоколом Совета № ',
    t16: ' от ',
    t17: '  следующее Имущество:',
    t18: '№ п/п',
    t19: 'Наименование/Реквизиты',
    t20: 'Форма имущества',
    t21: 'Ед изм.',
    t22: 'Количество',
    t23: 'Стоимость единицы (руб)',
    t24: 'Стоимость Всего',
    t25: 'ИТОГО:',
    t26: 'Претензий по качеству Имущества Общество не имеет. Согласованный Сторонами срок Гарантийного обязательства, согласно условий Договора  об участии в хозяйственной деятельности № ',
    t27: ' от ',
    t28: ' в отношении переданного Имущества составляет ',
    t29: ' дней. ',
    t30: 'ПЕРЕДАНО:   Подпись ',
    t31: 'Подписано электронной подписью',
    t32: 'ПОЛУЧЕНО:  Подпись ',
    t33: ' ',
    t34: ' ',
    t35: 'Подписано электронной подписью',
  },
}

export const exampleData = {
  meta: {
    created_at: '11.04.2024 12:00',
  },
  agreement_number: 'УХД-A3F9C2D1',
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
  property_category: 'Холодильное оборудование',
  property_media_links: 'https://example.ru/photo/vitrina',
  property_warranty_terms: 'Ремонт за счёт Пайщика при поломке, 180 дней',
  property_other: 'Комплект: витрина, полки, паспорт изделия',
  property_unit_cost: '85000.00 RUB',
  property_warranty_days: '180',
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
