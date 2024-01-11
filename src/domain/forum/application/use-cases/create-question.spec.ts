import { Slug } from '../../enterprise/entities/value-objects/slug'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

const fakeQuestionsRepository: QuestionsRepository = {
  async create() {
    return undefined
  },
}

describe('Create question use case', () => {
  it('should be able to create a question', async () => {
    const createQuestionUseCase = new CreateQuestionUseCase(
      fakeQuestionsRepository,
    )

    const { question } = await createQuestionUseCase.execute({
      content: 'nova pergunta',
      authorId: 'author-id-teste',
      title: 'teste',
    })

    expect(question.content).toBe('nova pergunta')
    expect(question.title).toBe('teste')
    expect(question.authorId).toEqual(new UniqueEntityID('author-id-teste'))
    expect(question.slug).toEqual(new Slug('teste'))
  })
})
