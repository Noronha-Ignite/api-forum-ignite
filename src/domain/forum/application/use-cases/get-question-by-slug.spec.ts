import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemorySutRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemorySutRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemorySutRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example Question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID(),
      content: 'Example Content',
    })

    inMemorySutRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
