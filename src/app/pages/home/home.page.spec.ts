import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal when clicked in the start button', fakeAsync(() => {
    let modalSpy = jasmine.createSpyObj('modal', {
      present: () => {
        return true;
      },
      onWillDismiss: () => {
        return { data: null };
      },
    });

    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });

    fixture.debugElement
      .query(By.css('.start-button'))
      .triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      expect(modalSpy.present).toHaveBeenCalled();
    });
  }));
});
