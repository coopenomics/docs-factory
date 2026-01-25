import { DraftContract } from 'cooptypes'
import { GenerationMoneyReturnUnusedStatement } from '../Templates'
import { DocFactory } from '../Factory'
import type { IGeneratedDocument, IGenerationOptions, IMetaDocument, ITemplate } from '../Interfaces'
import type { MongoDBConnector } from '../Services/Databazor'

export { GenerationMoneyReturnUnusedStatement as Template } from '../Templates'

export class Factory extends DocFactory<GenerationMoneyReturnUnusedStatement.Action> {
  constructor(storage: MongoDBConnector) {
    super(storage)
  }

  async generateDocument(data: GenerationMoneyReturnUnusedStatement.Action, options?: IGenerationOptions): Promise<IGeneratedDocument> {
    let template: ITemplate<GenerationMoneyReturnUnusedStatement.Model>

    if (process.env.SOURCE === 'local') {
      template = GenerationMoneyReturnUnusedStatement.Template
    }
    else {
      template = await this.getTemplate(DraftContract.contractName.production, GenerationMoneyReturnUnusedStatement.registry_id, data.block_num)
    }

    const meta: IMetaDocument = await this.getMeta({ title: template.title, ...data })
    const vars = await super.getVars(data.coopname, data.block_num)
    const userData = await super.getUser(data.username, data.block_num)
    const common_user = super.getCommonUser(userData)

    const combinedData: GenerationMoneyReturnUnusedStatement.Model = {
      meta,
      vars,
      common_user,
      contributor_hash: data.contributor_hash,
      contributor_short_hash: super.constructUHDContractNumber(data.contributor_hash),
      contributor_created_at: data.contributor_created_at,
      generator_agreement_hash: data.generator_agreement_hash,
      generator_agreement_short_hash: this.getShortHash(data.generator_agreement_hash),
      generator_agreement_created_at: data.generator_agreement_created_at,
      project_hash: data.project_hash,
      amount: data.amount,
    }

    await this.validate(combinedData, template.model)

    const translation = template.translations[meta.lang]
    const document: IGeneratedDocument = await this.generatePDF('', template.context, combinedData, translation, meta, options?.skip_save)

    return document
  }
}
