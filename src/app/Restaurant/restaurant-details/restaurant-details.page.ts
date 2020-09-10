import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restaurantService } from '../restaurant.service';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { shoppingServices } from 'src/app/Shopping/shopping.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  organisationId;
  userSigninData;

  detailFilter;
  businessUserDetails;

  foodCategory;
  productCategory;


  foodLists = [];

  sellerProducts: any;
  constructor(private route: ActivatedRoute, public RecipesServices: recipeservices, public userservice: userService, public Restaurantservice: restaurantService, public Shopping: shoppingServices, public toastController: ToastController, private router: Router, public Shoppingservice: shoppingServices, public http: HttpClient,) {
    if (!this.userservice.userId) {
      this.router.navigate(['/login', 'SignIn'])
    }
    else {
      this.organisationId = this.route.snapshot.params['id'];
      this.businessUserDetails = this.Restaurantservice.restaurantsData.find((value) => value.id == this.organisationId);
    }
  }

  ngOnInit() {
  }

  test(Categoryname) {
    this.scrollDownMessage();
    Categoryname = Categoryname.split(' ').join('');
    this.foodCategory = this.Restaurantservice.foodLists.filter((value) => this.organisationId == value.userId && value.productCategory == Categoryname);
    if (this.foodCategory.length < 1) {
      this.noFoodAvailabel();
    }
  }

  cartSelect(Quantity, Productid, Productname, Productimage, Productsellername, Productprice) {
    if (Quantity.value > 0) {
      let userId;
      userId = this.userservice.userId;
      this.addFoodNotification();
      this.Shopping.addQuantity(Productid,userId, Productname, Productsellername, Productimage, Quantity.value, Productprice);
      this.Cart();
    }
  }

  Cart() {
    this.Shopping.calculationOfCart();
  }

  async noFoodAvailabel() {
    const toast = await this.toastController.create({
      message: 'No Food Availabel.',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  async addFoodNotification() {
    const toast = await this.toastController.create({
      message: 'Item added.',
      duration: 2000,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }

  async scrollDownMessage() {
    const toast = await this.toastController.create({
      message: 'Scroll down to select foods.',
      duration: 2000,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }
}
