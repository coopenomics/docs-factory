#!/usr/bin/env node
/**
 * Заморозка выпущенных версий сборщиков (фабрика v2, шаг 7; FR28–FR29).
 *
 * Версия сборщика, однажды выпущенная, не правится: документы этой версии
 * пересобираются ею же, и любая правка её кода меняет старые документы.
 * Исправление ошибки — новый `minor` в конце того же файла
 * (`export const Factory_1_1 = defineBuilder…({ version: '1.1', … })`),
 * со своими эталонами.
 *
 * Замок `test/golden/builders.lock.json`: для каждой версии `<номер>@<версия>`
 * — файл, имя экспорта и SHA-256 её кода. Хэш считается без строк импорта и реэкспорта,
 * без комментариев и без различий в пробелах: перенос шаблонов в другой пакет
 * (шаг 6б) меняет только пути импорта, а смысл кода — нет. Проверка падает, если:
 *   - код замороженной версии изменился;
 *   - замороженная версия исчезла (документы этой версии нечем пересобрать);
 *   - появилась версия без записи в замке.
 * Вывод замороженной версии держат эталоны (`test/golden`): правка общих
 * помощников, меняющая документ, роняет их.
 *
 * Запуск:
 *   node scripts/builders-freeze-check.mjs            — проверка (CI, workflow Factory)
 *   node scripts/builders-freeze-check.mjs --update   — дописать НОВЫЕ версии в замок;
 *                                                      записи замороженных не меняет
 */
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const actionsDir = join(root, 'src', 'Actions')
const lockPath = join(root, 'test', 'golden', 'builders.lock.json')
const update = process.argv.includes('--update')

/** Код сборщика без импортов, комментариев и различий в пробелах. */
function codeOf(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter(line => !/^\s*(import\s|export\s+(\*|\{[^}]*\})\s+from\s)/.test(line))
    .map(line => line.replace(/(^|[^:'"`])\/\/.*$/, '$1'))
    .join(' ')
    // Пробелы не несут смысла: схлопываются, у знаков препинания убираются.
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}()[\],:;=<>+\-*/?.|&!])\s*/g, '$1')
    .trim()
}

/**
 * Конец выражения, начатого открывающей скобкой `open`: парные скобки с
 * пропуском строк, шаблонных строк и комментариев.
 */
function matchParen(text, open) {
  let depth = 0
  for (let i = open; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]
    if (ch === '/' && next === '/') { i = text.indexOf('\n', i); if (i < 0) return -1; continue }
    if (ch === '/' && next === '*') { i = text.indexOf('*/', i + 2) + 1; if (i <= 0) return -1; continue }
    if (ch === '\'' || ch === '"') {
      for (i++; i < text.length && text[i] !== ch; i++) if (text[i] === '\\') i++
      continue
    }
    if (ch === '`') {
      let tpl = 0
      for (i++; i < text.length; i++) {
        if (text[i] === '\\') { i++; continue }
        if (tpl === 0 && text[i] === '`') break
        if (text[i] === '$' && text[i + 1] === '{') { tpl++; i++; continue }
        if (tpl > 0 && text[i] === '}') tpl--
      }
      continue
    }
    if (ch === '(') depth++
    if (ch === ')' && --depth === 0) return i
  }
  return -1
}

/**
 * Версии сборщика в одном файле (решение владельца 30.10.2026): `Factory` —
 * 1.0, следующие дописываются в конец файла как `Factory_1_1`, `Factory_2_0`.
 * Хэш версии — общая часть файла до первой версии (помощники, кроме импортов)
 * плюс её собственный вызов `defineBuilder(...)`. Код между версиями и после
 * последней в хэши выпущенных версий не входит: помощники новой версии
 * пишутся рядом с ней, а не над замороженными.
 */
const EXPORT = /^export const (Factory(?:_\d+_\d+)?)\s*=/gm

/** Версии сборщиков по файлам `src/Actions`: ключ `<номер>@<версия>`. */
const found = {}
const problems = []
for (const name of readdirSync(actionsDir).filter(n => /^\d+\.[A-Za-z0-9_]+\.ts$/.test(n)).sort()) {
  const id = name.split('.')[0]
  const content = readFileSync(join(actionsDir, name), 'utf8')
  const exports = [...content.matchAll(EXPORT)]
  if (exports.length === 0) {
    problems.push(`${name}: нет ни одного export const Factory`)
    continue
  }
  const prelude = codeOf(content.slice(0, exports[0].index))
  for (const ex of exports) {
    const call = content.indexOf('()(', ex.index)
    const end = call < 0 ? -1 : matchParen(content, call + 2)
    if (end < 0) {
      problems.push(`${name}: ${ex[1]} — не найден конец вызова defineBuilder`)
      continue
    }
    const block = content.slice(ex.index, end + 1)
    const versions = [...block.matchAll(/^\s*version:\s*'(\d+\.\d+)',?\s*$/gm)].map(m => m[1])
    if (versions.length !== 1) {
      problems.push(`${name}: ${ex[1]} — ожидалось одно объявление version: 'M.m', найдено ${versions.length}`)
      continue
    }
    const key = `${id}@${versions[0]}`
    if (found[key]) {
      problems.push(`${name}: версия ${key} объявлена дважды`)
      continue
    }
    found[key] = { file: `src/Actions/${name}`, export: ex[1], sha256: createHash('sha256').update(`${prelude}\n${codeOf(block)}`).digest('hex') }
  }
}

const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, 'utf8')) : {}

for (const [key, frozen] of Object.entries(lock)) {
  const now = found[key]
  if (!now)
    problems.push(`${key}: замороженная версия исчезла (${frozen.file}) — документы этой версии нечем пересобрать`)
  else if (now.sha256 !== frozen.sha256)
    problems.push(`${key}: код ${now.export} в ${now.file} изменён, а версия заморожена — допишите новый minor в конец файла`)
}

const fresh = Object.keys(found).filter(key => !lock[key])

if (update) {
  if (problems.length) {
    console.error(`Замок не обновлён — сначала исправьте:\n  ${problems.join('\n  ')}`)
    process.exit(1)
  }
  const next = { ...lock }
  for (const key of fresh)
    next[key] = found[key]
  const sorted = Object.fromEntries(Object.keys(next).sort((a, b) => {
    const [ia, va] = a.split('@')
    const [ib, vb] = b.split('@')
    return Number(ia) - Number(ib) || va.localeCompare(vb, undefined, { numeric: true })
  }).map(k => [k, next[k]]))
  writeFileSync(lockPath, `${JSON.stringify(sorted, null, 2)}\n`)
  console.log(`Замок версий сборщиков: добавлено ${fresh.length}, всего ${Object.keys(sorted).length}`)
  process.exit(0)
}

for (const key of fresh)
  problems.push(`${key}: новая версия без записи в замке — node scripts/builders-freeze-check.mjs --update, вместе с эталонами версии`)

if (problems.length) {
  console.error(`Заморозка версий сборщиков нарушена:\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log(`Заморозка версий сборщиков: ${Object.keys(lock).length} версий, изменений нет`)
