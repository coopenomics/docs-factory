/**
 * Типы данных документа, которыми пользуются шаблоны реестра.
 *
 * Модель документа, субъекты и реквизиты пока живут в `cooptypes` (решение
 * владельца 30.10.2026: из `cooptypes` выносится только реестр шаблонов).
 * Пакет шаблонов берёт их из `cooptypes` только как типы: исполняемой зависимости от
 * `cooptypes` у пакета нет, и в собранном коде `cooptypes` не подключается.
 */
import type { Cooperative, Interfaces } from 'cooptypes'

// cooperative/document
export type IDecisionData = Cooperative.Document.IDecisionData
export type IDocDataRef = Cooperative.Document.IDocDataRef
export type IGenerate = Cooperative.Document.IGenerate
export type IMetaDocument = Cooperative.Document.IMetaDocument
export type IProjectData = Cooperative.Document.IProjectData

// cooperative/model
export type ICommonProgram = Cooperative.Model.ICommonProgram
export type ICommonRequest = Cooperative.Model.ICommonRequest
export type ICommonUser = Cooperative.Model.ICommonUser
export type ICooperativeData = Cooperative.Model.ICooperativeData
export type IFirstLastMiddleName = Cooperative.Model.IFirstLastMiddleName
export type IMeetExtended = Cooperative.Model.IMeetExtended
export type IQuestionExtended = Cooperative.Model.IQuestionExtended
export type IVars = Cooperative.Model.IVars

// cooperative/users, cooperative/payments
export type IEntrepreneurData = Cooperative.Users.IEntrepreneurData
export type IIndividualData = Cooperative.Users.IIndividualData
export type IOrganizationData = Cooperative.Users.IOrganizationData
export type IBankAccount = Cooperative.Payments.IBankAccount

// interfaces/meet
export type IMeetPoint = Interfaces.Meet.IMeetPoint
