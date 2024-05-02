import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error(`Could not find question with ID '${questionId}'`)
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not authorized.')
    }

    await this.questionRepository.delete(question)
  }
}
