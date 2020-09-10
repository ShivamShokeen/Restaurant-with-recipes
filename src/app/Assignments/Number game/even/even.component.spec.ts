import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvenComponent } from './even.component';

describe('EvenComponent', () => {
  let component: EvenComponent;
  let fixture: ComponentFixture<EvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
