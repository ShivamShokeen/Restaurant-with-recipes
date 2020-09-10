import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestaurantHomePage } from './restaurant-home.page';

describe('RestaurantHomePage', () => {
  let component: RestaurantHomePage;
  let fixture: ComponentFixture<RestaurantHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
