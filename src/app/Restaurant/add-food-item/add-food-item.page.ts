import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { FoodCategoryPage } from '../food-category/food-category.page';
import { restaurantService } from '../restaurant.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.page.html',
  styleUrls: ['./add-food-item.page.scss'],
})
export class AddFoodItemPage implements OnInit {

  @Input('restaurantId') restaurantId;
  @Input('type') type;
  sellername: any;

  addNewProduct = {
    userId: this.userservice.userId,
    name: "",
    productCategory: "",
    price: 0,
    image: "",
    description: "",
    city: "",
    sellerName: this.userservice.userName,
    premium: "",
  };

  foodData = {
    userId: this.userservice.userId,
    name: "",
    productCategory: "",
    price: 0,
    image: "",
    description: "",
    city: "",
    sellerName: this.userservice.userName,
    premium: "",
  }

  removeSpace;

  foodEditForm: FormGroup;
  foodType: any;
  error = null;
  loading = false;
  businessUserDetails: any;

  @ViewChild('F', { static: false }) Form;


  constructor(private route: ActivatedRoute, public Restaurantservice: restaurantService, public RecipesServices: recipeservices, public modalController: ModalController, public alertController: AlertController, public userservice: userService, private http: HttpClient, private router: Router, public toastController: ToastController) {
    if (!this.userservice.userId) {
      this.router.navigate(['/restaurant-home']);
    }
    this.Restaurantservice.getFoodCategory();
  }

  ngOnInit() {
    this.foodType = this.route.snapshot.params['type'];
    if (this.type == 'edit') {
      this.initForm();
    }
    this.addNewProduct.sellerName = this.userservice.userName;
  }

  newProduct() {
    if (this.Form.valid == false) {
      this.emptyFieldAlert();
    }
    else {
      this.removeSpace = this.removeSpace.split(' ').join('');
      this.addNewProduct.productCategory = this.removeSpace;
      this.http.post('https://restaurant-f5ce2.firebaseio.com/foodList.json', this.addNewProduct).subscribe(responseData => {
        this.router.navigate(['/restaurant-home']); this.Restaurantservice.reload();
      },error=>{
        if(error.status == 401){
          this.errorMessage();
        }
      });
    }
  }

  initForm() {
    let Restaurantproductuserid = '';
    let Restaurantproductname = '';
    let Restaurantproductprice = 0;
    let Restaurantproductimage = '';
    let Restaurantproductdescription = '';
    let Restaurantproductcity = '';
    let RestaurantproductCategory = '';
    let Restaurantproductsellername = '';
    let Restaurantproductpremium = '';

    let restaurant;
    restaurant = this.Restaurantservice.foodLists.filter((value) => value.id == this.restaurantId);
    restaurant.forEach((value) => {
      Restaurantproductuserid = value.user_UID;
      Restaurantproductname = value.name;
      Restaurantproductprice = value.price;
      Restaurantproductimage = value.image;
      Restaurantproductdescription = value.description;
      Restaurantproductcity = value.city;
      RestaurantproductCategory = value.productCategory;
      Restaurantproductsellername = value.sellerName;
      Restaurantproductpremium = value.premium;
    });

    this.foodEditForm = new FormGroup({
      'userid': new FormControl(Restaurantproductuserid),
      'name': new FormControl(Restaurantproductname),
      'productCategory': new FormControl(RestaurantproductCategory),
      'price': new FormControl(Restaurantproductprice),
      'image': new FormControl(Restaurantproductimage),
      'description': new FormControl(Restaurantproductdescription),
      'city': new FormControl(Restaurantproductcity),
      'sellerName': new FormControl(Restaurantproductsellername),
      'premium': new FormControl(Restaurantproductpremium)
    });
  }

  onRestaurantEdit() {
    if (this.foodEditForm.valid == true) {
      this.foodData.name = this.foodEditForm.value.name;
      this.foodData.productCategory = this.foodEditForm.value.productCategory;
      this.foodData.price = this.foodEditForm.value.price;
      this.foodData.image = this.foodEditForm.value.image;
      this.foodData.description = this.foodEditForm.value.description;
      this.foodData.city = this.foodEditForm.value.city;
      this.foodData.sellerName = this.foodEditForm.value.sellerName;
      this.foodData.premium = this.foodEditForm.value.premium;
      if (this.foodData.price != 0) {
        let specificKey: string;
        specificKey = 'https://restaurant-f5ce2.firebaseio.com/foodList/' + this.restaurantId + '.json';
        this.http.put(specificKey, this.foodData).subscribe((responseData) => { this.onDismiss(); this.router.navigate(['/restaurant-home']); this.Restaurantservice.reload(); },error=>{
          if(error.status == 401){
            this.errorMessage();
          }
        });
      }
    }
    else {
      this.emptyFieldAlert();
    }
  }

  async moveTofoodcategory() {
    const modal = await this.modalController.create({
      component: FoodCategoryPage,
      componentProps: { Request: 'true' }
    });
    return await modal.present();
  }


  reset() {
    this.loading = false;
  }

  onDismiss() {
    this.modalController.dismiss();
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

  async errorMessage() {
    const toast = await this.toastController.create({
      message: "You need to create your own firebase account and you can take help of 'Step video' that is available on my app 'BuildX Projects'.",
      duration: 4000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }

}
