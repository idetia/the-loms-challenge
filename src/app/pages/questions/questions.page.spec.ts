import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import { Question } from 'src/app/models/question.model';
import { QuestionComponent } from 'src/app/components/question/question.component';

describe('QuestionsPage', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;
  let question = new Question(
    '123456',
    'hard',
    'Which of these island countries is located in the Caribbean?',
    'Barbados',
    ['Fiji', 'Maldives', 'Seychelles']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Check answer" button disabled', () => {
    component.started = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement
        .querySelector('button.button-check-answer')
        .hasAttribute('disabled')
    ).toBeTrue();
  });

  it('should show "Check answer" button active when form is valid', () => {
    component.started = true;

    const fixtureActivedQuestion = TestBed.createComponent(QuestionComponent);
    const activedQuestion = fixtureActivedQuestion.componentInstance;
    component.activedQuestion = activedQuestion;

    component.activedQuestion!.question = question;
    component.activedQuestion!.answerForm.get('answer')?.setValue('Barbados');

    component.validateForm(component.activedQuestion!.answerForm.valid);

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement
        .querySelector('button.button-check-answer')
        .hasAttribute('disabled')
    ).toBeFalse();
  });

  it('should show "Next question" button active when question is cheched', () => {
    component.started = true;

    const fixtureActivedQuestion = TestBed.createComponent(QuestionComponent);
    const activedQuestion = fixtureActivedQuestion.componentInstance;
    component.activedQuestion = activedQuestion;

    component.activedQuestion!.question = question;
    component.activedQuestion!.answerForm.get('answer')?.setValue('Barbados');
    component.activedQuestion!.resolve();

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement
        .querySelector('button.button-next-question')
        .hasAttribute('disabled')
    ).toBeFalse();
  });

  it('should show "Finish test" button when question is cheched and it is the last question', () => {
    component.started = true;

    const fixtureActivedQuestion = TestBed.createComponent(QuestionComponent);
    const activedQuestion = fixtureActivedQuestion.componentInstance;
    component.activedQuestion = activedQuestion;

    component.results = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    component.activedQuestionIndex = 10;
    component.activedQuestion!.question = question;
    component.activedQuestion!.answerForm.get('answer')?.setValue('Barbados');
    component.activedQuestion!.resolve();

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement
        .querySelector('button.button-finish-test')
        .hasAttribute('disabled')
    ).toBeFalse();
  });
});
