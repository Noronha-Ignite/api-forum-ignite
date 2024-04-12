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
    const { question } = await sut.execute({
      content: 'nova pergunta',
      authorId: 'author-id-teste',
      title: 'teste',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toBe('nova pergunta')
    expect(question.title).toBe('teste')
    expect(question.authorId).toEqual(new UniqueEntityID('author-id-teste'))
    expect(question.slug).toEqual(new Slug('teste'))
    expect(inMemorySutRepository.items[0].id).toEqual(question.id)
  })
})
