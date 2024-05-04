import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

type CreateQuestionCommentPayload = Optional<QuestionCommentProps, 'createdAt'>

export class QuestionComment extends Entity<QuestionCommentProps> {
  static create(props: CreateQuestionCommentPayload, id?: UniqueEntityID) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return questionComment
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
