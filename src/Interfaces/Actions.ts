import type { IGenerateJoinCoopDecision as DocsIGenerateJoinCoopDecision, IGenerateWalletAgreement } from '@coopenomics/docs-templates'
import type { IGenerate } from './Documents'

export type IGenerateJoinCoopDecision = DocsIGenerateJoinCoopDecision

/**
 * Интерфейс генерации заявления на вступление в кооператив
 */
export interface IGenerateJoinCoop extends IGenerate {
  signature: string
  skip_save: boolean
}

export type IGenerateAgreement = IGenerateWalletAgreement
