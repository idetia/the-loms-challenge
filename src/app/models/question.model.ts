export class Question {
  constructor(
    public id: string,
    public category: string,
    public question: string,
    public correctAnswer: string,
    public incorrectAnswers: Array<string>,
    public userResponse?: string
  ) {}
}
