import Mail from '../../lib/Mail';

class AnswerMail {
  /**
   * Creating a unique key for the job
   * (each job has to have an unique key)
   */
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOther } = data;

    await Mail.sendMail({
      to: `${helpOther.student.email} <>`,
      subject: 'Resposta ao Questionamento',
      template: 'answer-help',
      context: {
        student_name: helpOther.student.name,
        question: helpOther.question,
        answer: helpOther.answer,
      },
    });
  }
}

export default new AnswerMail();
