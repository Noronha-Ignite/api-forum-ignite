import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  async create() {
    return undefined
  },
}

describe('Answer question use case', () => {
  it('should be able to create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(answer.content).toBe('nova resposta')
  })
})
