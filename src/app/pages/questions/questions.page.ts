import {
  Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { TOTAL_QUESTIONS } from '../../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements AfterViewInit, OnDestroy {
  @ViewChildren(QuestionComponent) questionsList!: QueryList<QuestionComponent>;

  public started: boolean;
  public questionsError: any;
  public questions$!: Observable<Question[]>;
  public results: Array<boolean | null>;
  public activedQuestionIndex: number;
  public activedQuestion?: QuestionComponent;
  private questionsListSubscription!: Subscription;
  public totalQuestions: number;
  public isFormValid: boolean;

  constructor(
    private questionsService: QuestionsService,
    private modalController: ModalController
  ) {
    this.started = false;
    this.results = [null];
    this.activedQuestionIndex = 0;
    this.isFormValid = false;
    this.totalQuestions = TOTAL_QUESTIONS;
    this.questionsError = null;
    this.questions$ = this.questionsService.getQuestions().pipe(
      catchError((error) => {
        this.questionsError = error;
        return throwError(error);
      })
    );
  }

  ngAfterViewInit() {
    this.questionsListSubscription = this.questionsList.changes.subscribe(
      () => {
        this.activedQuestion = this.questionsList?.get(
          this.activedQuestionIndex
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.questionsListSubscription.unsubscribe();
  }

  startTest() {
    this.started = true;
  }

  nextQuestion() {
    this.activedQuestionIndex++;
    this.questionResult(null);
    this.activedQuestion = this.questionsList?.get(this.activedQuestionIndex);
  }

  goToQuestion(index: number) {
    this.activedQuestionIndex = index;
  }

  questionResult(result: boolean | null) {
    this.results[this.activedQuestionIndex] = result;
  }

  validateForm(isValid: boolean) {
    this.isFormValid = isValid;
  }

  finishTest() {
    this.modalController.dismiss({ results: this.results });
  }
}
