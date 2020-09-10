import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemoveFoodItemsPage } from './remove-food-items.page';

describe('RemoveFoodItemsPage', () => {
  let component: RemoveFoodItemsPage;
  let fixture: ComponentFixture<RemoveFoodItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveFoodItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveFoodItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
