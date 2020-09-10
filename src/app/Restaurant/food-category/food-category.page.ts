import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { restaurantService } from '../restaurant.service';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.page.html',
  styleUrls: ['./food-category.page.scss'],
})
export class FoodCategoryPage implements OnInit {

  @Input('Request') Request;
  food = {
    UserId: this.userservice.userId,
    Tagname: ""
  }
  error;
  clearErrorMessage = true;

  allDataOfFoodCategory;
  allDataOfCustomFoodCategory;
  usertype;
  DataOfCustomFoodCategory;

  constructor(private route: ActivatedRoute, public RecipesServices: recipeservices, public modalController: ModalController, public alertController: AlertController, public userservice: userService, private http: HttpClient, private router: Router, public toastController: ToastController, public restaurantservice: restaurantService,) { }

  ngOnInit() {
    if (!this.userservice.userId) {
      this.router.navigate(['/restaurant-home']);
    }
    else {
      this.usertype = this.route.snapshot.queryParams['type'];
      this.restaurantservice.getFoodCategory();
      this.DataOfCustomFoodCategory = this.restaurantservice.customfoodcategory;
    }
  }

  submit(formData: NgForm) {
    if (formData.value.foodTag != "" && formData.value.foodTag != null && this.food.UserId != "" && this.food.Tagname != "") {
      this.allDataOfFoodCategory = this.restaurantservice.foodcategory.filter((value) => value.name === this.food.Tagname);
      if (this.allDataOfFoodCategory == 0) {
        this.allDataOfCustomFoodCategory = this.restaurantservice.customfoodcategory.filter((value) => value.foodTag === this.food.Tagname && value.userId === this.userservice.userId);
        if (this.allDataOfCustomFoodCategory.length == 0) {
          this.http.post<{ name: string }>('https://restaurant-f5ce2.firebaseio.com/customFoodCategory.json', this.food).subscribe(responseData => {
            this.Successfull();
          }, error => {
            this.error = error.message;
            console.log(error);
          });
        }
        else {
          this.alreadySend();
        }
      }
      else {
        this.nameExist();
      }
    }
    else {
      this.emptyFieldAlert();
    }
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter tag name before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async nameExist() {
    const toast = await this.toastController.create({
      message: 'This tag name was already exit and to see it go to add food item and select "category" .',
      duration: 7000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  async Successfull() {
    const toast = await this.toastController.create({
      message: 'Requent send successfully to superior.',
      duration: 2000,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  }

  async alreadySend() {
    const toast = await this.toastController.create({
      message: 'You already send this name request.',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  resetErrorMessage() {
    this.clearErrorMessage = false;
  }

  onDismiss() {
    this.modalController.dismiss();
  }

}
