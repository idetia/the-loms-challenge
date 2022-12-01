import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() index: number;
  @Input() isResolved: boolean;
  @Output() result: EventEmitter<boolean>;
  @Output() validation: EventEmitter<boolean>;
  private validationSubscription: Subscription;
  public answers: Array<string>;
  public answerForm: FormGroup;
  public formType!: string;

  constructor() {
    this.result = new EventEmitter();
    this.validation = new EventEmitter();
    this.answers = [];
    this.isResolved = false;
    this.index = -1;

    this.answerForm = new FormGroup({
      answer: new FormControl('', [Validators.required]),
    });

    this.validationSubscription = this.answerForm.valueChanges.subscribe(() => {
      this.validation.emit(this.answerForm.valid);
    });
  }

  ngOnInit() {
    this.formType =
      this.question.correctAnswer.indexOf(' ') === -1 ? 'input' : 'check';

    this.answers = [
      this.question.correctAnswer,
      ...this.question.incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  }

  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
  }

  resolve() {
    if (this.answerForm.invalid) {
      return;
    }

    this.answerForm.disable();
    this.isResolved = true;
    this.result.emit(
      this.answerForm.controls['answer'].value.toLowerCase() ===
        this.question.correctAnswer.toLowerCase()
    );
  }
}
