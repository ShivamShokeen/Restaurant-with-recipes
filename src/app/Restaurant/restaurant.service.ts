import { Injectable } from '@angular/core';
import { userService } from '../Typesofroutings/users/users.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class restaurantService {


    error: any;
    restaurantsData: any;
    VerifiedRestaurantProduct: any;
    foodcategory = [];
    customfoodcategory: any;
    editProduct;
    foodLists: any;


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
    constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, public alertController: AlertController, public userservice: userService) {
        let reference2: any;
        let duplicateData2 = [];
        let filterCondition2: any;
        let removeDup2: any;

        reference2 = firebase.database().ref('/foodList').on("value", (snapshot) => {
            let index: string;
            for (index in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(index)) {
                    filterCondition2 = { ...snapshot.val()[index], id: index };
                    duplicateData2.push(filterCondition2);
                    removeDup2 = duplicateData2.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                    this.foodLists = removeDup2;
                }
            }
        });
    }

    reload() {
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
                        this.restaurantsData = removeDup;
                    }
                }
            }
        });

        let reference2: any;
        let duplicateData2 = [];
        let filterCondition2: any;
        let removeDup2: any;

        reference2 = firebase.database().ref('/foodList').on("value", (snapshot) => {
            let index: string;
            for (index in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(index)) {
                    filterCondition2 = { ...snapshot.val()[index], id: index };
                    duplicateData2.push(filterCondition2);
                    removeDup2 = duplicateData2.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                    this.foodLists = removeDup2;
                }
            }
        });
    }


    filterResults(searchText) {
        if (searchText == undefined) {
            return this.restaurantsData;
        }
        else {
            return this.restaurantsData.filter(value => {
                return value.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
            })
        }
    }

    // verifyRestaurantProduct(ProductId) {
    //     this.VerifiedRestaurantProduct = this.restaurantsData.filter((value) => value.userId == ProductId);
    // }

    getFoodCategory() {
        this.http.get('https://restaurant-f5ce2.firebaseio.com/Foodcategories.json').pipe(map(responseData => {
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    this.foodcategory.push({ ...responseData[key], id: key })
                }
            }
            return this.foodcategory;
        })).subscribe(data => {
        }, error => {
            console.log(error);
        });

        let reference3: any;
        let duplicateData3 = [];
        let filterCondition3: any;
        let removeDup3: any;

        reference3 = firebase.database().ref('/customFoodCategory').on("value", (snapshot) => {
            let index: string;
            for (index in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(index)) {
                    filterCondition3 = { ...snapshot.val()[index], id: index };
                    duplicateData3.push(filterCondition3);
                    removeDup3 = duplicateData3.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                    this.customfoodcategory = removeDup3;
                }
            }
        });
    }

}   