import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { Registry } from '@coopenomics/docs-templates'
import { Generator } from '../src'
import type { IGenerate, IGeneratedDocument } from '../src/Interfaces/Documents'
import { coopname, deleteAllFiles, generator, testStorage } from './utils'
import { testDocumentGeneration } from './utils/testDocument'

beforeAll(async () => {
  await generator.connect(testStorage())
})

beforeEach(async () => {

})

describe('тест генератора документов общих собраний', async () => {
  const _testMeetHash = ('test_meet_hash_12345').toUpperCase()
  const _testDecisionId = 2

  // Тестовые данные для документа 300 (передаются напрямую)
  const testMeetData = {
    type: 'regular' as const,
    open_at_datetime: '20.12.2024 10:00 (Мск)',
    close_at_datetime: '21.12.2024 18:00 (Мск)',
  }

  const testQuestions = [
    {
      number: '1',
      title: 'Утверждение годового отчёта',
      context: 'О деятельности кооператива за 2024 год',
      decision: 'Утвердить годовой отчёт кооператива за 2024 год',
    },
    {
      number: '2',
      title: 'Избрание совета кооператива',
      decision: 'Избрать новый состав совета кооператива',
      context: 'Тут дополнительная информация о вопросе',
    },
  ]

  it('генерируем предложение повестки дня (300)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingAgenda.Action>({
      registry_id: Registry.AnnualGeneralMeetingAgenda.registry_id,
      coopname: 'voskhod',
      username: 'individual',
      meet: testMeetData,
      questions: testQuestions,
      is_repeated: false,
    })
  })

  it('генерируем предложение повестки дня повторного собрания (300 с is_repeated)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingAgenda.Action>({
      registry_id: Registry.AnnualGeneralMeetingAgenda.registry_id,
      coopname: 'voskhod',
      username: 'individual',
      meet: testMeetData,
      questions: testQuestions,
      is_repeated: true,
    })
  })

  it('генерируем решение совета о созыве собрания (301)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingSovietDecision.Action>({
      registry_id: Registry.AnnualGeneralMeetingSovietDecision.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      decision_id: _testDecisionId,
      meet_hash: _testMeetHash,
      is_repeated: false,
    })
  })

  it('генерируем решение совета о повторном созыве собрания (301 с is_repeated)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingSovietDecision.Action>({
      registry_id: Registry.AnnualGeneralMeetingSovietDecision.registry_id,
      coopname: 'voskhod',
      username: 'ant',
      decision_id: _testDecisionId,
      meet_hash: _testMeetHash,
      is_repeated: true,
    })
  })

  it('генерируем уведомление о проведении собрания (302)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingNotification.Action>({
      registry_id: Registry.AnnualGeneralMeetingNotification.registry_id,
      coopname: 'voskhod',
      username: 'individual',
      meet_hash: _testMeetHash,
    })
  })

  it('генерируем заявление с бюллетенем для голосования (303)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingVotingBallot.Action>({
      registry_id: Registry.AnnualGeneralMeetingVotingBallot.registry_id,
      coopname: 'voskhod',
      username: 'individual',
      meet_hash: _testMeetHash,
      answers: [
        {
          id: '1',
          number: '1',
          vote: 'for',
        },
        {
          id: '2',
          number: '2',
          vote: 'against',
        },
      ],
    })
  })

  it('генерируем протокол решения общего собрания (304)', async () => {
    await testDocumentGeneration<Registry.AnnualGeneralMeetingDecision.Action>({
      registry_id: Registry.AnnualGeneralMeetingDecision.registry_id,
      coopname: 'voskhod',
      username: 'individual',
      meet_hash: _testMeetHash,
    })
  })
})
