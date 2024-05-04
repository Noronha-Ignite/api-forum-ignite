import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

type CreateAnswerCommentPayload = Optional<AnswerCommentProps, 'createdAt'>

export class AnswerComment extends Entity<AnswerCommentProps> {
  static create(props: CreateAnswerCommentPayload, id?: UniqueEntityID) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answerComment
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
