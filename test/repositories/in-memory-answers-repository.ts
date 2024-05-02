import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((item) => !item.id.isEqualTo(answer.id))
  }

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }
}
