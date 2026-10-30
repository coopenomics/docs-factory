# @coopenomics/docs-factory

Фабрика документов цифрового кооператива. Собирает юридически значимые документы
по шаблонам из цепи и данным пайщиков: модель документа → HTML (Nunjucks) → PDF
(WeasyPrint 67). Хэш документа — SHA-256 PDF; повторная сборка по метаданным даёт
тот же документ байт в байт.

Пакет вынесен из монорепозитория `C9S/mono` 29.10.2026 (шаг 6а фабрики v2).
Прежнее имя `@coopenomics/factory` устарело.

## Что внутри

- **Сборщики всех видов документов** цифрового кооператива — 92 вида (`src/Actions`).
  Сборщик — объявление: какие данные прочитать на блок документа и как собрать
  из них модель (`defineBuilder`, `src/Builder`).
- **Версии сборщиков** `major.minor`. Версия пишется в `meta.builder` нового
  документа; пересборка идёт ровно той версией, что записана в мете. Все версии
  вида документа — в одном файле: `Factory` (1.0) и дописанные в конец
  `Factory_1_1`, `Factory_2_0`. Выпущенная версия заморожена: исправление —
  новый `minor` в конце файла.
- **Шаблоны документов** — второй пакет репозитория `@coopenomics/docs-templates`
  (`packages/docs-templates`): тексты, схемы, переводы, типы `Action` и `Model`
  каждого вида документа, модель документа, данные кооператива, субъекты и
  реквизиты. Пакет самостоятельный, зависимостей нет. Выходит одной версией с фабрикой. Фабрика собирает из
  них реестр шаблонов (`src/Templates`) с номерами редакций; ключ `x-builder` в
  схеме редакции объявляет, под какой `major` сборщика она написана.
- **Порт хранилища** `IFactoryStorage` и реализации: PostgreSQL
  (`PostgresFactoryStorage`, Kysely) и память (`MemoryFactoryStorage`).
- **Порт данных цепи** `IChainDataSource`: шаблоны, таблицы и действия на блок.

## Установка

```bash
pnpm add @coopenomics/docs-factory @coopenomics/docs-templates cooptypes
```

Версии `docs-factory` и `docs-templates` в приложении ставятся одинаковыми.

`cooptypes` — зависимость приложения (`peerDependencies`): фабрика берёт тот
выпуск, что стоит у приложения.

Для PDF нужен WeasyPrint 67 в `/venv/bin/python3` и системный шрифт Arial —
как в образе контроллера (`components/controller/Dockerfile` в `C9S/mono`).

## Использование

```ts
import { Generator, PostgresFactoryStorage } from '@coopenomics/docs-factory'

const generator = new Generator(chainDataSource) // реализация IChainDataSource
await generator.connect(new PostgresFactoryStorage({ host, port, user, password, database }))

// Новая сборка: версия сборщика — по объявлению действующей редакции шаблона
const document = await generator.generate({ registry_id: 1, coopname: 'voskhod', username: 'ant', lang: 'ru' })

// Пересборка по метаданным подписанного документа — тем же сборщиком
const same = await generator.generate({ ...document.meta }, { skip_save: true })
```

Таблицы хранилища на узле создаёт миграция контроллера; отдельному приложению —
`await storage.ensureSchema()`.

## Разработка

Тесты и эталоны запускаются только в CI (workflow `Factory`, `.github/workflows/factory.yml`)
на каждый пуш. Локально — сборка и проверки сборщиков:

| Команда | Что делает |
|---|---|
| `pnpm build` | сборка (unbuild) с проверкой типов |
| `pnpm lint` | ESLint |
| `pnpm check` | полнота экспорта сборщиков, чтения на блок, заморозка версий |
| `node scripts/x-builder-check.mjs` | `x-builder` не меняется внутри редакции (после `pnpm build`) |
| `node scripts/golden-coverage.mjs` | у каждого вида документа есть эталон |

Эталоны — `test/golden/<номер>/<случай>.{html,meta.json,pdf.sha256}`. Пересоздать —
пуш в ветку `ci/update`, забрать артефакт `factory-golden`, закоммитить; только
при осознанной смене вывода. Правила для сборщиков — `CLAUDE.md`.

Совместная правка с монорепозиторием: в `C9S/mono` — `pnpm factory:link`
(подключает этот чекаут, ожидается в `~/docs-factory`) и `pnpm factory:unlink`.

## Выпуск

1. Поднять `version` в `package.json` и в `packages/docs-templates/package.json`
   (одна семантическая версия), коммит в `main`.
2. Тег `vX.Y.Z` (предварительный — `vX.Y.Z-dev.N`) в `C9S/docs-factory`.
3. Workflow `Release`: проверки Factory → сверка тега с версиями обоих пакетов →
   публикация в npm шаблонов, затем фабрики (предварительная — с меткой `next`) →
   робот открывает PR в `C9S/mono` → `dev` с новой точной версией обоих пакетов во
   всех `package.json` и `pnpm-lock.yaml`.

Монорепозиторий поднимает версию только этим PR: гейт `pnpm check` держит
точную и одну версию, контроллер при старте сверяет установленную фабрику с
объявленной.

## Приватные данные документа: `doc_data`

Зарезервированный механизм для документов, содержащих персональные данные (ФИО экспедитора, паспорт, госномер, телефон и т.п.), которые **не должны попадать в блокчейн**.

### Поток

1. Контроллер собирает приватный payload и вызывает `generator.saveDocData(payload, registry_id)` — возвращается `{ hash }` (sha256, идемпотентный).
2. `hash` передаётся on-chain в Action под зарезервированным именем `doc_data_hash`.
3. При сборке и пересборке фабрика подгружает payload из хранилища (`getDocData(hash)`) и подставляет в модель документа как `doc_data`.
4. Шаблон документа использует приватные поля как `{{ doc_data.<field> }}`.

### Пример

Контроллер:

```ts
const { hash } = await generator.saveDocData({
  expeditor_full_name: 'Иванов Иван Иванович',
  passport: '4509 123456',
  phone: '+79991234567',
  vehicle_registration_number: 'А123ВВ77',
}, 1103)

// в Action документа 1103 (MarketplaceTransportNote):
await generator.generate({
  registry_id: 1103,
  coopname: 'voskhod',
  username: operatorAccount,
  shipment_id,
  doc_data_hash: hash,
})
```

Сборщик (`src/Actions/1103.MarketplaceTransportNote.ts`) объявляет чтение, каркас его выполняет:

```ts
reads: ({ data, f }) => ({
  docData: () => f.loadDocData<TransportNoteDocData>(data),
  // …
}),
assemble: ({ meta, reads: { docData } }) => ({ meta, doc_data: docData, /* … */ }),
```

Шаблон (`src/Templates/1103.MarketplaceTransportNote.ts`):

```html
<tr><th>Экспедитор</th><td>{{ doc_data.expeditor_full_name }}</td></tr>
<tr><th>Госномер</th><td>{{ doc_data.vehicle_registration_number }}</td></tr>
```

### Зарезервированные имена шаблона

| Имя | Источник | Применение |
|---|---|---|
| `meta` | factory | заголовки, дата, lang, hash |
| `coop` | factory | реквизиты кооператива |
| `vars` | factory | переменные кооператива |
| `user` | factory | подписант (по сертификату) |
| `request` / `program` / `decision` | factory | контекст ЦПП |
| `branch` | factory | данные КУ |
| **`doc_data`** | **DocDataService** | **приватные данные документа** |

### Graceful degradation

Если приватные данные удалены (например, по запросу пайщика), документ остаётся **верифицируемым по хэшу подписи** (хэш зафиксирован on-chain), но не регенерируется. Это явное архитектурное решение: ценность блокчейн-подписи сохраняется; восстановление PDF — обратимо deprecated.

### Когда применять

- **Новые документы** с персональными данными — сразу через `doc_data`.
- **Существующие документы** (700-1099, 300-304 и т.д.) — остаются без изменений. Паттерн прогрессивный, переводить старые документы при отсутствии необходимости не нужно.

## Лицензия

[BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.ru)
