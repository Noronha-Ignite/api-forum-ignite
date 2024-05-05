import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error(
        `Could not find question comment with ID '${questionCommentId}'`,
      )
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not authorized.')
    }

    await this.questionCommentRepository.delete(questionComment)
  }
}
