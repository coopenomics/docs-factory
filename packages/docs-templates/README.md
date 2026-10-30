# @coopenomics/docs-templates

Шаблоны документов цифрового кооператива: для каждого вида документа — номер
реестра, текст, схема данных `model`, переводы, типы `Action` и `Model` и
пример данных. Рядом — реестр решений совета, которые выполняет робот.

```ts
import { Registry } from '@coopenomics/docs-templates'

Registry.WalletAgreement.registry_id // 1
type Model = Registry.WalletAgreement.Model
```

Рядом с реестром — модель документа (`IMetaDocument`, `IGenerate`,
`IGenerationOptions`, `IGeneratedDocument`), данные кооператива (`IVars`,
`ICooperativeData`, `UdataKey`), субъекты (`IIndividualData`,
`IOrganizationData`, `IEntrepreneurData`) и реквизиты (`IBankAccount`).
Данные цепи, которые входят в модель документа (кооператив, член совета,
собрание, вопрос), пакет описывает сам: модель шаблона заморожена вместе с ним.

Пакет самостоятельный: зависимостей нет, `cooptypes` ему не нужен. Типы цепи —
в `cooptypes`; подписанный документ в цепи берёт мету из этого пакета.

Пакет живёт в репозитории `C9S/docs-factory` вторым пакетом и выходит одной
версией с фабрикой `@coopenomics/docs-factory`.
