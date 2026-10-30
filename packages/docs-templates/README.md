# @coopenomics/docs-templates

Шаблоны документов цифрового кооператива: для каждого вида документа — номер
реестра, текст, схема данных `model`, переводы, типы `Action` и `Model` и
пример данных. Рядом — реестр решений совета, которые выполняет робот.

```ts
import { Registry } from '@coopenomics/docs-templates'

Registry.WalletAgreement.registry_id // 1
type Model = Registry.WalletAgreement.Model
```

Пакет живёт в репозитории `C9S/docs-factory` вторым пакетом и выходит одной
версией с фабрикой `@coopenomics/docs-factory`. Типы модели документа,
субъектов и реквизитов берутся из `cooptypes` (зависимость хозяина); в
собранном коде `cooptypes` не подключается.
