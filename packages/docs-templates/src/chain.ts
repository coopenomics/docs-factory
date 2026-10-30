/**
 * Данные цепи в том виде, в каком они входят в модель документа.
 *
 * Модель документа — снимок данных на блок документа, замороженный вместе с
 * шаблоном: смена ABI контракта не должна молча менять модель уже выпущенного
 * шаблона. Поэтому пакет шаблонов описывает эти данные сам и от `cooptypes`
 * не зависит (решение владельца 30.10.2026). Поля повторяют таблицы и
 * структуры контрактов на дату выноса: `registrator::coops`,
 * `soviet::boards`, `meet::meets`, `meet::questions`.
 */

/** Подпись документа в цепи. */
export interface IChainSignature {
  id: number
  signed_hash: string
  signer: string
  public_key: string
  signature: string
  signed_at: string
  meta: string
}

/** Документ в цепи (структура `document2` контрактов). */
export interface IChainDocument {
  version: string
  hash: string
  doc_hash: string
  meta_hash: string
  meta: string
  signatures: IChainSignature[]
}

/** Кооператив из реестра (`registrator::coops`). */
export interface IChainCooperative {
  username: string
  parent_username: string
  announce: string
  description: string
  is_cooperative: boolean
  is_branched: boolean
  is_enrolled: boolean
  coop_type: string
  registration: string
  initial: string
  minimum: string
  org_registration: string
  org_initial: string
  org_minimum: string
  status: string
  created_at: string
  document: IChainDocument
  active_participants_count: number | string
}

/** Член совета (`soviet::boards`). */
export interface IBoardMember {
  username: string
  is_voting: boolean
  position_title: string
  position: string
}

/** Собрание пайщиков (`meet::meets`). */
export interface IMeet {
  id: number | string
  hash: string
  coopname: string
  type: string
  level: string
  initiator: string
  presider: string
  secretary: string
  status: string
  created_at: string
  open_at: string
  close_at: string
  notified_users: string[]
  quorum_percent: number
  signed_ballots: number | string
  current_quorum_percent: number
  cycle: number | string
  quorum_passed: boolean
  proposal: IChainDocument
  authorization: IChainDocument
  decision1: IChainDocument
  decision2: IChainDocument
}

/** Пункт повестки собрания. */
export interface IMeetPoint {
  context: string
  title: string
  decision: string
}

/** Вопрос собрания (`meet::questions`). */
export interface IQuestion {
  id: number | string
  number: number | string
  coopname: string
  meet_id: number | string
  title: string
  context: string
  decision: string
  counter_votes_for: number | string
  counter_votes_against: number | string
  counter_votes_abstained: number | string
  voters_for: string[]
  voters_against: string[]
  voters_abstained: string[]
}
