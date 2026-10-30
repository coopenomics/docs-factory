/**
 * Реестр сборщиков (шаг 4 фабрики v2, FR16–FR17).
 *
 * Раньше `Generator.connect` держал таблицу из 92 строк «номер реестра →
 * new Factory(storage)», и новый документ требовал правки таблицы. Теперь
 * реестр собирается из экспортов `src/Actions`: каждый модуль отдаёт `Factory`
 * (класс из `defineBuilder`) и `Template` (пространство шаблона с номером
 * реестра). Новый документ — файл сборщика и строка экспорта в
 * `src/Actions/index.ts`; полноту экспорта держит `scripts/actions-index-check.mjs`.
 *
 * Расхождения ловятся при старте, а не при первой сборке: два модуля одной
 * версии, номер объявления не равен номеру шаблона, шаблон реестра без
 * сборщика или сборщик без шаблона.
 */
import type { DocFactory } from '../Factory'
import type { IGenerate } from '../Interfaces/Documents'
import type { IFactoryStorage } from '../Storage'
import { Registry as Templates } from '../Templates/registry'
import { FIRST_BUILDER_VERSION, isBuilderVersion } from './version'
import type { BuilderVersion } from './version'

type BuilderClass = new (storage: IFactoryStorage) => DocFactory<IGenerate>

/**
 * Модуль сборщика — один файл `src/Actions/<номер>.<Имя>.ts` на вид
 * документа: пространство шаблона с номером реестра и версии сборщика.
 * `Factory` — первая версия (`1.0`); следующие дописываются в конец того же
 * файла экспортом `Factory_<major>_<minor>` (`Factory_1_1`, `Factory_2_0`).
 * Решение владельца 30.10.2026: файлов по версиям не множить, вид документа
 * остаётся одним файлом под своим номером.
 */
export interface IBuilderModule {
  Factory: BuilderClass
  Template: { registry_id: number }
  [version: `Factory_${number}_${number}`]: BuilderClass
}

/** Имя экспорта версии сборщика: `Factory` или `Factory_<major>_<minor>`. */
const BUILDER_EXPORT = /^Factory(_\d+_\d+)?$/

function isBuilderModule(value: unknown): value is IBuilderModule {
  if (!value || typeof value !== 'object')
    return false
  const m = value as Partial<IBuilderModule>
  return typeof m.Factory === 'function' && typeof m.Template?.registry_id === 'number'
}

/** Классы всех версий сборщика из модуля, с именем экспорта. */
function builderExports(module: IBuilderModule): Array<[string, BuilderClass]> {
  return Object.entries(module)
    .filter(([key, value]) => BUILDER_EXPORT.test(key) && typeof value === 'function') as Array<[string, BuilderClass]>
}

/** Версии сборщиков одного вида документа: `major.minor` → фабрика. */
export type BuilderSet = Map<BuilderVersion, DocFactory<IGenerate>>

/**
 * Собирает сборщики по номеру реестра и версии из модулей `Actions`
 * (шаг 7: у вида документа несколько версий сборщика — экспорты `Factory`,
 * `Factory_1_1`, … одного файла). Бросает ошибку с перечнем всех расхождений
 * сразу: дубль версии, версия не совпадает с именем экспорта, расхождение
 * номера с шаблоном, шаблон без сборщика, сборщик без шаблона, вид без `1.0`.
 */
export function buildFactories(modules: Record<string, unknown>, storage: IFactoryStorage): Record<number, BuilderSet> {
  const builders: Record<number, BuilderSet> = {}
  const problems: string[] = []

  for (const [name, module] of Object.entries(modules)) {
    if (!isBuilderModule(module)) {
      problems.push(`${name}: модуль не экспортирует Factory и Template.registry_id`)
      continue
    }
    const id = module.Template.registry_id
    for (const [exportName, Builder] of builderExports(module)) {
      const where = `${name}.${exportName}`
      const factory = new Builder(storage)
      const spec = (factory as { spec?: { registry_id?: number, version?: unknown } }).spec
      if (spec?.registry_id !== undefined && spec.registry_id !== id)
        problems.push(`${where}: объявление сборщика ${spec.registry_id} не совпадает с номером шаблона ${id}`)
      const version = spec?.version ?? FIRST_BUILDER_VERSION
      if (!isBuilderVersion(version)) {
        problems.push(`${where}: версия сборщика ${JSON.stringify(version)} не в виде major.minor`)
        continue
      }
      // Имя экспорта называет ту же версию, что объявление: Factory — 1.0,
      // Factory_1_1 — 1.1. Иначе по имени в файле не найти нужную версию.
      const expected = exportName === 'Factory' ? FIRST_BUILDER_VERSION : exportName.slice('Factory_'.length).replace('_', '.')
      if (version !== expected)
        problems.push(`${where}: экспорт ${exportName} объявляет версию ${version}, по имени ожидается ${expected}`)
      const set = builders[id] ?? (builders[id] = new Map())
      if (set.has(version)) {
        problems.push(`${where}: версия ${version} сборщика ${id} уже объявлена`)
        continue
      }
      set.set(version, factory)
    }
  }

  const templateIds = Object.keys(Templates).map(Number)
  for (const id of templateIds) {
    if (!builders[id])
      problems.push(`шаблон ${id} есть в реестре шаблонов, сборщика для него нет`)
  }
  for (const [id, set] of Object.entries(builders)) {
    if (!templateIds.includes(Number(id)))
      problems.push(`сборщик ${id} есть, шаблона ${id} в реестре шаблонов нет`)
    // Документы до оси версий пересобираются версией 1.0 — она обязана быть.
    if (!set.has(FIRST_BUILDER_VERSION))
      problems.push(`у сборщика ${id} нет версии ${FIRST_BUILDER_VERSION}: документы до оси версий нечем пересобрать`)
  }

  if (problems.length > 0)
    throw new Error(`Реестр сборщиков собран с ошибками:\n  ${problems.join('\n  ')}`)

  return builders
}
