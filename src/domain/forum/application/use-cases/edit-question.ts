import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title?: string
  content?: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error(`Could not find question with ID '${questionId}'`)
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not authorized.')
    }

    question.title = title ?? question.title
    question.content = content ?? question.content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
