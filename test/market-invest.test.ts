/**
 * Документы инвестиционного этапа кооперативного участка Стола заказов
 * (задача 99D-29): договор участия, заявления о трансляции в договор и
 * обратно, заявление, протокол совета и акт на имущество (1118–1123).
 * Каждая сборка сверяется со снимком в test/golden/<номер>.
 */
import { beforeAll, describe, it } from 'vitest'
import { Registry } from '@coopenomics/docs-templates'
import { generator, testStorage } from './utils'
import { testDocumentGeneration } from './utils/testDocument'

beforeAll(async () => {
  await generator.connect(testStorage())
})

const HASH = '6a1c0e4f3d2b5a6978c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a1'
const AGREEMENT = { agreement_number: 'A3F9C2D1', agreement_created_at: '07.11.2026' }
const BRANCH = { braname: 'krg', branch_name: 'Коргашино' }
const PROPERTY = {
  property_hash: HASH,
  property_form: 'thing',
  property_name: 'Холодильная витрина Polair',
  property_description: 'Серийный номер 23B0418, 2024 года выпуска, исправна',
  property_quantity: '1',
  property_unit: 'шт.',
  property_amount: '85000.0000 RUB',
}

describe('документы инвестиционного этапа участка Стола заказов', () => {
  it('1118 договор участия в хозяйственной деятельности по ЦПП «Стол заказов»', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestAgreement.Action>({
      registry_id: Registry.MarketplaceInvestAgreement.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      agreement_number: AGREEMENT.agreement_number,
    })
  })

  it('1119 заявление о трансляции паевого взноса в договор участия', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestStatement.Action>({
      registry_id: Registry.MarketplaceInvestStatement.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      invest_hash: HASH,
      amount: '300000.0000 RUB',
      ...BRANCH,
      ...AGREEMENT,
    })
  })

  it('1120 заявление о паевом взносе имуществом в кооперативный участок', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestPropertyStatement.Action>({
      registry_id: Registry.MarketplaceInvestPropertyStatement.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      branch_chairman_name: 'Петров Пётр Петрович',
      ...BRANCH,
      ...AGREEMENT,
      ...PROPERTY,
    })
  })

  it('1121 протокол решения совета о приёме имущества в кооперативный участок', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestPropertyDecision.Action>({
      registry_id: Registry.MarketplaceInvestPropertyDecision.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      decision_id: 1,
      ...BRANCH,
      ...AGREEMENT,
      ...PROPERTY,
    })
  })

  it('1122 акт приёма-передачи имущества в кооператив', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestPropertyAct.Action>({
      registry_id: Registry.MarketplaceInvestPropertyAct.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      decision_id: 1,
      branch_chairman_name: 'Петров Пётр Петрович',
      ...BRANCH,
      ...AGREEMENT,
      ...PROPERTY,
    })
  })

  it('1123 заявление о трансляции средств с кошелька договора участия на главный паевой', async () => {
    await testDocumentGeneration<Registry.MarketplaceInvestClaimStatement.Action>({
      registry_id: Registry.MarketplaceInvestClaimStatement.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      claim_hash: HASH,
      amount: '42000.0000 RUB',
      ...BRANCH,
      ...AGREEMENT,
    })
  })
})
