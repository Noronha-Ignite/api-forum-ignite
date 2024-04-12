import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemorySutRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer question use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemorySutRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(answer.content).toBe('nova resposta')
    expect(inMemorySutRepository.items[0].id).toEqual(answer.id)
  })
})
