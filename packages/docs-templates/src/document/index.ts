/**
 * Модель документа: мета, вход сборщика, параметры сборки, собранный
 * документ и общие части моделей шаблонов. Перенесено из `cooptypes`
 * (`cooperative/document`) 30.10.2026 — шаг 6б фабрики v2. Типы подписанного
 * документа в цепи (`IChainDocument2`, `ISignedDocument2`, канонизация
 * подписи) остаются в `cooptypes` и берут мету из этого пакета.
 */
export * from './approvals'

export interface IGenerationOptions {
  skip_save?: boolean
  lang?: string
  /**
   * Собрать только HTML, без PDF и без хэша. Для публичного показа положения
   * на сайте: страница берёт тот же документ, что направляется на подпись, но не
   * платит за рендер PDF на каждый заход. Документ без хэша не сохраняется.
   */
  skip_pdf?: boolean
  /**
   * Публичный показ: подписант ещё не известен, на его месте остаётся прочерк
   * под рукописное заполнение. Отдельный флаг, а не пустой username: meta
   * требует имя того, от кого сформирован документ (при публичном показе — сам
   * кооператив), и по нему подписанта уже не отличить.
   */
  blank_signer?: boolean
}

export type LangType = 'ru'

// Определение базового интерфейса для мета-информации
export interface IMetaDocument {
  title: string
  registry_id: number
  lang: string
  generator: string
  version: string
  coopname: string
  username: string
  /**
   * Момент генерации документа в ISO 8601, UTC, до миллисекунд
   * (`2026-09-24T11:05:31.123Z`). Вид для человека («ДД.ММ.ГГГГ ЧЧ:ММ» в поясе
   * `timezone`) собирает рендер: шаблон выводит его переменной `created_at`.
   * Документы до 28.09.2026 хранят здесь дату уже в виде для человека.
   */
  created_at: string
  block_num: number
  timezone: string
  links: string[]
  /**
   * Версия сборщика документа `major.minor` (фабрика v2, шаг 7). Пишется в
   * каждый новый документ; пересборка берёт сборщик ровно этой версии.
   * Документы до 29.10.2026 поля не имеют — их пересобирает версия `1.0`.
   */
  builder?: string
}

export interface IGeneratedDocument<T = any> {
  full_title: string
  html: string
  hash: string
  meta: IMetaDocument & T
  binary: Uint8Array
}

export interface ZGeneratedDocument<T = any> {
  full_title: string
  html: string
  hash: string
  meta: IMetaDocument & T
  binary: string
}

/**
 * Общий интерфейс для генерации/регенерации документа
 */
export interface IGenerate extends Omit<Partial<IMetaDocument>, 'title'> {
  registry_id: number
  coopname: string
  username: string
  [key: string]: any
}

/**
 * Зарезервированная ссылка на приватный payload документа.
 * Action конкретного документа расширяет этот интерфейс, если хочет
 * хранить персональные/приватные данные off-chain — payload лежит в
 * коллекции `doc_private_data` фабрики, on-chain публикуется только
 * `doc_data_hash`. См. раздел «Document Generation Pattern: doc_data»
 * в архитектуре.
 */
export interface IDocDataRef {
  doc_data_hash?: string
}

/**
 * Интерфейс генерации заявления на вступление в кооператив
 */
export interface IGenerateJoinCoop extends IGenerate {
  signature: string
  skip_save: boolean
}

/**
 * Интерфейс генерации решения совета
 */
export interface IGenerateJoinCoopDecision extends IGenerate {
  decision_id: number
}

/**
 * Интерфейс генерации соглашения
 */
export interface IGenerateWalletAgreement extends IGenerate {
  registry_id: number
}

export interface IDecisionData {
  id: number
  date: string
  time: string
  votes_for: number
  votes_against: number
  votes_abstained: number
  voters_percent: number
  // decision: SovietContract.Tables.Decisions.IDecision
}

export interface IProjectData {
  id: string
  title?: string
  question: string
  decision: string
}

export interface IIntellectualResult {
  quantity: number
  name: string
  currency: string
  unit_price: number
  total_price: number
  description: string
}

export interface IUHDContract {
  number: string
  date: string
}

export interface IContributionAmount {
  amount: number
  currency: string
  words: string
}
