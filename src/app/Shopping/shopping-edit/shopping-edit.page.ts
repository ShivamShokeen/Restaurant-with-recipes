import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { recipeservices } from 'src/app/Recipes/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { shoppingServices } from '../shopping.service';
import { userService } from 'src/app/Typesofroutings/users/users.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.page.html',
  styleUrls: ['./shopping-edit.page.scss'],
})
export class ShoppingEditPage implements OnInit {

  Subtotal: any;

  Product = [
    {
      Id: "",
      Name: "",
      Sellername: "",
      Image: "",
      Quantity: 0,
      Price: 0
    }
  ]

  orderList: any;

  constructor(public modalController: ModalController,
    private recipesServices: recipeservices,
    private route: ActivatedRoute, private router: Router, public Shopping: shoppingServices, public userservice: userService, public toastController: ToastController) { }

  ngOnInit() {
    if (!this.userservice.userId) {
      this.router.navigate(['/restaurant-home']);
    }
    else {
      this.Product = this.Shopping.productQuantity;
      this.Subtotal = this.Shopping.productCalculation;
      this.calculationOfProducts();
      this.orderList = this.Shopping.productQuantity.filter((value)=>value.userId == this.userservice.userId);
    }
  }

  calculationOfProducts() {
  }

  readyForPayment() {
    this.thanksMessage();
  }
  async thanksMessage() {
    const toast = await this.toastController.create({
      message: 'Thanks for purchasing :)',
      duration: 2000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }

}
