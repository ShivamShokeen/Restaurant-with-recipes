import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipesEditPage } from './recipes-edit.page';

describe('RecipesEditPage', () => {
  let component: RecipesEditPage;
  let fixture: ComponentFixture<RecipesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
