import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { userService } from '../Typesofroutings/users/users.service';

@Injectable({ providedIn: 'root' })
export class recipeservices {

    recipesData = [];
    sellerDetails: any;
    VerifiedRecipeProduct: any;
    restaurantData = [];
    productCategories = [
        {
            name: "Today's Exclusive"
        },
        {
            name: "Starters"
        },
        {
            name: "Rice and Biryani"
        },
        {
            name: "Main Course"
        },
        {
            name: "Tawa Specials"
        },
        {
            name: "Combos"
        },
        {
            name: "Rice Bowl"
        },
        {
            name: "Salads"
        },
        {
            name: "Breads"
        },
        {
            name: "Momos"
        },
        {
            name: "Accompaniments"
        },
        {
            name: "Desserts"
        },
        {
            name: "Soft Drinks"
        },
        {
            name: "Hard Drinks"
        },
        {
            name: "Non-veg"
        },
    ];
        

    constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, public alertController: AlertController, public userservice: userService) {  this.getRecipes(); }

    getSellerId() {
        this.sellerDetails = this.userservice.userDetails.filter((value) =>
            value.id == this.userservice.userId);
    }

    getRecipes() {
        this.http.get<{ address: string, city: string, country: string, description: string, id: string, image: string, name: string, organizationsid: number, premium: string, price: number, productCategory: string, productId: number, userId: string, sellerName: string, Ingredients: string, Directions: string }>('https://restaurant-f5ce2.firebaseio.com/Recipesproduct.json').pipe(map(responseData => {

            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    this.recipesData.push({ ...responseData[key], id: key })
                }
            }
            return this.recipesData;
        })
        ).subscribe(data => {
        }, error => {
            console.log(error);
        });
    }


    getRestaurant() {
        this.http.get<{ address: string, checkedTC: string, city: string, country: string, customOrganizationName: string, email: string, image: string, legalName: string, name: string, phoneVerification: string, siteOfOrganization: string, usertype: string, zipcode: string }>('https://restaurant-f5ce2.firebaseio.com/businessSignup.json').pipe(map(responseData => {

            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    this.restaurantData.push({ ...responseData[key], id: key })
                }
            }
            return this.restaurantData;
        })
        ).subscribe(data => {
            // console.log(data);
        });
    }

    verifyRecipeProduct(ProductId) {
        this.VerifiedRecipeProduct = this.recipesData.filter((value) => value.userId == ProductId);
    }

    organizations = [
        {
            id: 1,
            name: "abc(dummycompanyname)"
        },
        {
            id: 2,
            name: "def(dummycompanyname)"
        },
        {
            id: 3,
            name: "ghi(dummycompanyname)"
        },
        {
            id: 4,
            name: "jkl(dummycompanyname)"
        },

    ];

    getId: number;

    // getRecipes() {
    //     return this.recipes.slice();
    // }

}