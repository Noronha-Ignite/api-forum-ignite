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
    const result = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySutRepository.items[0]).toEqual(result.value.answer)
  })
})
