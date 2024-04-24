import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (override: Partial<QuestionProps> = {}) => {
  const question = Question.create({
    title: 'Example',
    authorId: new UniqueEntityID(),
    content: 'Example Content',
    ...override,
  })

  return question
}
