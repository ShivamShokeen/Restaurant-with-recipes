import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessLoginPage } from './business-login.page';

describe('BusinessLoginPage', () => {
  let component: BusinessLoginPage;
  let fixture: ComponentFixture<BusinessLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
