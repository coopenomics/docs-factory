import type { ICommonUser, ICooperativeData, IVars } from '../../model'
import type { IGenerate, IMetaDocument } from '../../document'

// Инвестиционный этап кооперативного участка Стола заказов (задачи 99D-29, 99D-35).
// Текст — дословно Приложение № 1 к документу владельца «Договор УХД_ИНВЕСТ_ПВЗ_КУ»
// (12.11.2026); пропуски бланка заменены подстановками.

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

export const title = 'Заявление о паевом взносе имуществом в кооперативный участок'
export const description = 'Заявление пайщика о внесении паевого взноса имуществом в кооперативный участок Стола заказов'

export const context = `<div class="digital-document"><div style="text-align: right"><p>{% trans 't1' %}</p><p>{% trans 't2' %}{{ agreement_number }}</p></div><p>{% trans 't3' %}{{ vars.full_abbr_genitive }}{% trans 't4' %}{{ vars.name }}{% trans 't5' %}</p><p>{% trans 't6' %}{{ common_user.full_name_or_short_name }}</p><div style="text-align: center"><h2>{% trans 't7' %}</h2></div><p>{% trans 't8' %}{{ agreement_number }}{% trans 't9' %}{{ agreement_created_at }}{% trans 't10' %}</p><table><tr><th>{% trans 't11' %}</th><td>{{ property_name }}</td></tr><tr><th>{% trans 't12' %}</th><td>{{ property_category }}</td></tr><tr><th>{% trans 't13' %}</th><td>{{ property_description }}</td></tr><tr><th>{% trans 't14' %}</th><td>{{ property_media_links }}</td></tr><tr><th>{% trans 't15' %}</th><td>{{ property_warranty_terms }}</td></tr><tr><th>{% trans 't16' %}</th><td>{{ property_other }}</td></tr></table><table class="grid"><tr><th>{% trans 't17' %}</th><th>{% trans 't18' %}</th><th>{% trans 't19' %}</th><th>{% trans 't20' %}</th><th>{% trans 't21' %}</th><th>{% trans 't22' %}</th></tr><tr><td>1</td><td>{{ property_name }}</td><td>{{ property_unit }}</td><td>{{ property_quantity }}</td><td>{{ property_unit_cost }}</td><td>{{ property_amount }}</td></tr><tr><td></td><td>{% trans 't23' %}</td><td></td><td></td><td></td><td>{{ property_amount }}</td></tr></table><p>{% trans 't24' %}</p><p>{% trans 't25' %}{{ property_warranty_days }}{% trans 't26' %}</p><div style="display: flex; justify-content: space-between;"><p>{{ created_at }}</p><p>{% trans 't27' %}{{ common_user.full_name_or_short_name }}</p></div><p style="text-align: right;">{% trans 't28' %}</p><p style="margin-top: 30px;">{% trans 't29' %}</p><p>{% trans 't30' %}</p><p>{{ vars.short_abbr }}{% trans 't31' %}{{ vars.name }}{% trans 't32' %}</p><p>{{ coop.chairman.last_name }}{% trans 't33' %}{{ coop.chairman.first_name }}{% trans 't34' %}{{ coop.chairman.middle_name }}</p></div><style>.digital-document {padding: 20px;white-space: pre-wrap;}table {width: 100%;border-collapse: collapse;margin-top: 20px;}th, td {border: 1px solid #ccc;padding: 8px;text-align: left;word-wrap: break-word;overflow-wrap: break-word;vertical-align: top;}th {width: 30%;font-weight: bold;}.grid th {width: auto;}</style>`

export const translations = {
  ru: {
    t1: 'Приложение № 1 ',
    t2: 'к ДОГОВОРУ об участии в хозяйственной деятельности № ',
    t3: 'В Совет ',
    t4: ' “',
    t5: '”',
    t6: 'от Пайщика ',
    t7: 'ЗАЯВЛЕНИЕ',
    t8: 'В соответствии с условиями Договором об участии в хозяйственной деятельности № ',
    t9: ' от ',
    t10: ', прошу принять от меня Паевой взнос в Общество следующим Имуществом:',
    t11: 'Наименование',
    t12: 'Категория Имущества',
    t13: 'Описание, характеристики',
    t14: 'Ссылки на фото, видео и аудиоматериалы',
    t15: 'Гарантийные условия и предлагаемый срок действия',
    t16: 'Прочие характеристики и описание',
    t17: '№ п/п',
    t18: 'Наименование/Реквизиты',
    t19: 'Ед изм.',
    t20: 'Количество',
    t21: 'Стоимость единицы',
    t22: 'Стоимость Всего, Руб.',
    t23: 'ИТОГО:',
    t24: 'Я подтверждаю, что Имущество, которые я вношу паевым взносом в Общество, не противоречит и не нарушает законодательство РФ, принадлежат мне на праве собственности, в споре и под арестом не состоят.',
    t25: 'Срок Гарантийных обязательств по передаваемому Имуществу составляет ',
    t26: ' дней с даты фактической передачи.',
    t27: 'Пайщик ',
    t28: 'Подписано электронной подписью',
    t29: '“ПРИНЯТО”',
    t30: 'Председатель Совета',
    t31: ' “',
    t32: '”',
    t33: ' ',
    t34: ' ',
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
