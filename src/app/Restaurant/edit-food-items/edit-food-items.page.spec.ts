import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFoodItemsPage } from './edit-food-items.page';

describe('EditFoodItemsPage', () => {
  let component: EditFoodItemsPage;
  let fixture: ComponentFixture<EditFoodItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFoodItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
