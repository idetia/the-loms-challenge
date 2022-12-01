import { Question } from './question.model';

describe('Question', () => {
  it('should create an instance', () => {
    const question = new Question(
      '123456',
      'hard',
      'Which of these island countries is located in the Caribbean?',
      'Barbados',
      ['Fiji', 'Maldives', 'Seychelles']
    );
    expect(question).toBeTruthy();
  });
});
