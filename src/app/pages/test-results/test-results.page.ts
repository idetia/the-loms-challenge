import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.page.html',
  styleUrls: ['./test-results.page.scss'],
})
export class TestResultsPage implements OnInit {
  @Input() results: Array<boolean>;
  public success: number;
  public errors: number;

  constructor(private modalController: ModalController) {
    this.results = [];
    this.success = 0;
    this.errors = 0;
  }

  ngOnInit() {
    this.results.map((item) => {
      if (item) {
        this.success++;
      } else {
        this.errors++;
      }
    });
  }

  close() {
    this.modalController.dismiss();
  }
}
