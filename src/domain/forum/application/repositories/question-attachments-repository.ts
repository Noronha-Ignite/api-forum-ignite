import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findAllByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
