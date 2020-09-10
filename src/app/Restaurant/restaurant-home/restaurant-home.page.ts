import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { restaurantService } from '../restaurant.service';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.page.html',
  styleUrls: ['./restaurant-home.page.scss'],
})
export class RestaurantHomePage implements OnInit {

  originazationDetails: any;
  allRestaurantData: any;
  sellerProducts: any;
  searchText: any;
  product: any;

  constructor(public alertController: AlertController, public restaurantservice: restaurantService, public userservice: userService, public RecipeService: recipeservices, public Restaurant: restaurantService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantservice.reload();
    this.RecipeService.getRestaurant();
    this.executeFirst();
  }

  executeFirst() {
    let reference: any;
    let duplicateData = [];
    let filterCondition: any;

    reference = firebase.database().ref('/userAccounts').on("value", (snapshot) => {
      let index: string;
      for (index in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(index)) {
          filterCondition = { ...snapshot.val()[index], id: index };
          if (filterCondition.legalName) {
            duplicateData.push(filterCondition);
            let removeDup: any;
            removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            this.restaurantservice.restaurantsData = removeDup;
            this.filter();
          }
        }
      }
    });
  }

  filter() {
    this.product = this.restaurantservice.filterResults(this.searchText);
  }

  async call() {
    const alert = await this.alertController.create({
      header: 'ABC Company',
      message: 'Phone number :011 00000044',
      buttons: ['OK']
    });

    await alert.present();
  }


}
