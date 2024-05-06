import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemorySutRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemorySutRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemorySutRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemorySutRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemorySutRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-2') }),
    )

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value.answers).toHaveLength(2)
  })

  it('should be able to paginated fetch question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemorySutRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value.answers).toHaveLength(2)
  })
})
