/**
 * Шаблоны документов цифрового кооператива (фабрика v2, шаг 6б, решение 7 PRD).
 *
 * `Registry` — реестр шаблонов: по пространству на вид документа с номером
 * реестра, текстом, схемой `model`, переводами, типами `Action` и `Model` и
 * примером данных. Реестр решений совета для робота ссылается на шаблоны
 * протоколов и живёт рядом с ними.
 *
 * Пакет выходит одной версией с `@coopenomics/docs-factory` из того же
 * репозитория: шаблон и сборщик одной версии совпадают по построению.
 */
export { version as DOCS_TEMPLATES_VERSION } from '../package.json'
export * as Registry from './registry'
export * from './decisionTypes'
// Модель документа, данных кооператива, субъектов и реквизитов — то, из чего
// собираются модели шаблонов. Пакет от `cooptypes` не зависит.
export * from './document'
export * from './model'
export * from './users'
export * from './payments'
