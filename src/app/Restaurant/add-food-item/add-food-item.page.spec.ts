import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFoodItemPage } from './add-food-item.page';

describe('AddFoodItemPage', () => {
  let component: AddFoodItemPage;
  let fixture: ComponentFixture<AddFoodItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFoodItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
