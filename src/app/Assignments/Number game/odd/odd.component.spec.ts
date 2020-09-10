import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OddComponent } from './odd.component';

describe('OddComponent', () => {
  let component: OddComponent;
  let fixture: ComponentFixture<OddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
