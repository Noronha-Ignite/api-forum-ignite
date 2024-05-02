import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemorySutRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemorySutRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'content-1',
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newAnswer)
    expect(inMemorySutRepository.items[0]).toMatchObject({
      content: 'content-1',
    })

    await sut.execute({
      answerId: 'id-test',
      authorId: 'author-1',
      content: 'content-2',
    })

    expect(inMemorySutRepository.items[0]).toMatchObject({
      content: 'content-2',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'content-1',
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newAnswer)

    expect(() =>
      sut.execute({
        answerId: 'id-test',
        authorId: 'author-2',
        content: 'content-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
