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
      attachmentIds: ['attachment-1', 'attachment-2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySutRepository.items[0]).toEqual(result.value.question)
    expect(inMemorySutRepository.items[0].attachments).toHaveLength(2)
    expect(inMemorySutRepository.items[0].attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-2'),
      }),
    ])
  })
})
