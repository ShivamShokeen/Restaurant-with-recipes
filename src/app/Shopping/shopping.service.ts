import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { recipeservices } from '../Recipes/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../Typesofroutings/users/users.service';

@Injectable({ providedIn: 'root' })
export class shoppingServices {

    constructor(public modalController: ModalController,
        private recipesServices: recipeservices,
        private route: ActivatedRoute, private router: Router, public Shopping: shoppingServices, public userservice: userService, public toastController: ToastController) { }

    productQuantity = [];

    arrSlice = [];
    productCalculation: number;
    cartProductPrice = [];
    Total: any;

    addQuantity(id, userId, name, sellerName, image, quantity, price) {
        if (userId == this.userservice.userId) {
            this.productQuantity.push({
                Id: id,
                userId: this.userservice.userId,
                Name: name,
                Sellername: sellerName,
                Image: image,
                Quantity: quantity,
                Price: price
            });
        }
    }

    calculationOfCart() {
        this.arrSlice = this.productQuantity.slice(-1);
        this.arrSlice.forEach((value) => {
            if (value.Quantity > 0 && value.Price > 0) {
                this.productCalculation = value.Quantity * value.Price;
            }
        });
        this.cartProductPrice.push(this.productCalculation);
        this.Total = this.cartProductPrice.map(a => a).reduce(function (a, b) {
            return a + b;
        });
    }

}