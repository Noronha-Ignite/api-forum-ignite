import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error(`Could not find answer with ID '${answerId}'`)
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not authorized.')
    }

    await this.answerRepository.delete(answer)
  }
}
