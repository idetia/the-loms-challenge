import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { QuestionsPageModule } from '../questions/questions.module';
import { TestResultsPageModule } from '../test-results/test-results.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QuestionsPageModule,
    TestResultsPageModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
