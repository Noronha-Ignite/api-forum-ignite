import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemorySutRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemorySutRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
        title: 'title-1',
        content: 'content-1',
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newQuestion)
    expect(inMemorySutRepository.items[0]).toMatchObject({
      title: 'title-1',
      content: 'content-1',
    })

    await sut.execute({
      questionId: 'id-test',
      authorId: 'author-1',
      title: 'title-2',
      content: 'content-2',
    })

    expect(inMemorySutRepository.items[0]).toMatchObject({
      title: 'title-2',
      content: 'content-2',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
        title: 'title-1',
        content: 'content-1',
      },
      new UniqueEntityID('id-test'),
    )

    inMemorySutRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'id-test',
      authorId: 'author-2',
      title: 'title-2',
      content: 'content-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
