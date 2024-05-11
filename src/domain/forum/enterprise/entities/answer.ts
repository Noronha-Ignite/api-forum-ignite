import { AnswerAttachmentList } from './answer-attachment-list'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
  attachments: AnswerAttachmentList
}

type CreateAnswerPayload = Optional<AnswerProps, 'createdAt' | 'attachments'>

export class Answer extends Entity<AnswerProps> {
  static create(props: CreateAnswerPayload, id?: UniqueEntityID) {
    const answer = new Answer(
      {
        createdAt: new Date(),
        attachments: new AnswerAttachmentList(),
        ...props,
      },
      id,
    )

    return answer
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
