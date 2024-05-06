import { expect } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemorySutRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemorySutRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newAnswer)
    expect(inMemorySutRepository.items).toHaveLength(1)

    await sut.execute({ answerId: 'id-test', authorId: 'author-1' })

    expect(inMemorySutRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newAnswer)
    expect(inMemorySutRepository.items).toHaveLength(1)

    const result = await sut.execute({
      answerId: 'id-test',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
