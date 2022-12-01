import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Question } from 'src/app/models/question.model';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let question = new Question(
    '123456',
    'hard',
    'Which of these island countries is located in the Caribbean?',
    'Barbados',
    ['Fiji', 'Maldives', 'Seychelles']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.question = question;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create a input text if the correct answer is a single word', () => {
    component.question = question;
    component.question.correctAnswer = 'Theanswer';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('input[type=text]')
    ).toBeTruthy();
  });

  it('should create 4 radio buttons if the correct answer has more than 1 word', () => {
    component.question = question;
    component.question.correctAnswer = 'The answer';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('input[type=radio]')
        .length
    ).toBe(4);
  });

  it('should show message error if the answer is not correct (input text case)', () => {
    component.question = question;
    component.question.correctAnswer = 'CorrectAnswer';

    component.answerForm.get('answer')?.setValue('My answer');
    component.isResolved = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('.wrong-answer-alert')
    ).toBeTruthy();
  });

  it('should show mark the right and wrong option (radio buttons case)', () => {
    component.question = question;
    component.question.correctAnswer = 'John Smith';

    component.answerForm.get('answer')?.setValue('John Smith');
    component.isResolved = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.correct-answer input[type=radio]'
      ).value
    ).toBe('John Smith');

    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '.wrong-answer input[type=radio]'
      ).length
    ).toBe(3);
  });
});
