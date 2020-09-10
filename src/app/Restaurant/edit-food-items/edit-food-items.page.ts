import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { restaurantService } from '../restaurant.service';
import { AddFoodItemPage } from '../add-food-item/add-food-item.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-food-items',
  templateUrl: './edit-food-items.page.html',
  styleUrls: ['./edit-food-items.page.scss'],
})
export class EditFoodItemsPage implements OnInit {

  loading = false;
  foodList: any;

  constructor(private route: ActivatedRoute, public RecipesServices: recipeservices, public modalController: ModalController, public alertController: AlertController, public userservice: userService, private http: HttpClient, private router: Router, public Restaurantservice: restaurantService, public toastController: ToastController,) {

    if (!this.userservice.userId) {
      this.router.navigate(['/restaurant-home'])
    }
    else {
      this.foodList = this.Restaurantservice.foodLists.filter((value) => value.userId == this.userservice.userId);
    }
  }

  ngOnInit() {
  }

  reset() {
    this.loading = false;
  }

  deleteItem(productId) {
    firebase.database().ref().child('/Restaurantproducts/' + productId).remove();
    this.deleteProductMessage();
  }

  async deleteProductMessage() {
    const toast = await this.toastController.create({
      message: 'Deleted successfully.',
      duration: 4000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  async moveToAddRestaurantPage(id) {
    const modal = await this.modalController.create({
      component: AddFoodItemPage,
      componentProps: { 'restaurantId': id, 'type': 'edit' }
    })
    return await modal.present();
  }

  async Workinprogress() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Work in Progress.",
      animated: true,
      buttons: ['OK']
    });
    await alert.present();
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      // message: "Please enter " + this.emptyValue +  " before submitting.",
      message: "Please enter data before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }


}
