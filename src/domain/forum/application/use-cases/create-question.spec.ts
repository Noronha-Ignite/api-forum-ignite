import { Slug } from '../../enterprise/entities/value-objects/slug'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemorySutRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question use case', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemorySutRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      content: 'nova pergunta',
      authorId: 'author-id-teste',
      title: 'teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.id).toBeTruthy()
    expect(result.value.question.content).toBe('nova pergunta')
    expect(result.value.question.title).toBe('teste')
    expect(result.value.question.authorId).toEqual(
      new UniqueEntityID('author-id-teste'),
    )
    expect(result.value.question.slug).toEqual(Slug.create('teste'))
    expect(inMemorySutRepository.items[0].id).toEqual(result.value.question.id)
  })
})
