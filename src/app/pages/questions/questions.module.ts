import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionsPage } from './questions.page';
import { QuestionComponent } from '../../components/question/question.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [QuestionsPage, QuestionComponent],
})
export class QuestionsPageModule {}
