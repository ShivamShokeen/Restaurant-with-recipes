import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameControlComponent } from './game-control.component';

describe('GameControlComponent', () => {
  let component: GameControlComponent;
  let fixture: ComponentFixture<GameControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
