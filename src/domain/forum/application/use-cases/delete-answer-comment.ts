import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error(
        `Could not find answer comment with ID '${answerCommentId}'`,
      )
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not authorized.')
    }

    await this.answerCommentRepository.delete(answerComment)
  }
}
