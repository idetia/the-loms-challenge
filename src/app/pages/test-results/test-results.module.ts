import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestResultsPage } from './test-results.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NgCircleProgressModule],
  declarations: [TestResultsPage],
})
export class TestResultsPageModule {}
