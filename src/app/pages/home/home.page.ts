import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { QuestionsPage } from '../questions/questions.page';
import { TestResultsPage } from '../test-results/test-results.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public modalController: ModalController) {}

  public async openChallenge() {
    const modal = await this.modalController.create({
      component: QuestionsPage,
      backdropDismiss: false,
      canDismiss: true,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.results) {
      const modalResults = await this.modalController.create({
        component: TestResultsPage,
        backdropDismiss: false,
        canDismiss: true,
        componentProps: { results: data.results },
      });

      return modalResults.present();
    }
  }
}
