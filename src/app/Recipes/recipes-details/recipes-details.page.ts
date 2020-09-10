import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { recipeservices } from '../recipes.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { shoppingServices } from 'src/app/Shopping/shopping.service';
import { userService } from 'src/app/Typesofroutings/users/users.service';


@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.page.html',
  styleUrls: ['./recipes-details.page.scss'],
})
export class RecipesDetailsPage implements OnInit {

  pDetails:
    {
      productId: number
    }
  detailFilter: any[] = [];
  productId: number;


  productCalculation: number;
  dummy: number;
  arrSlice = [];
  showPrice = false;
  addingSpaceToDirection;
  addingSpaceToIngredients;

  constructor(public modalController: ModalController,
    public recipesServices: recipeservices,
    private route: ActivatedRoute, private router: Router, public Shopping: shoppingServices, public alertController: AlertController, public userservice: userService, public toastController: ToastController,) { }

  ngOnInit() {
    // this.recipesServices.getRecipes();
    if (this.userservice.userId) {
      this.pDetails = {
        productId: this.route.snapshot.params.id
      };
      this.Details();
    }
  }

  Details() {
    // 1st way : - By retrieving url id we can also get our product details (it uses router link)

    // this.pDetails = {
    //   id : this.route.snapshot.params.id
    // }
    let removeDuplicate;
    removeDuplicate = this.recipesServices.recipesData.filter((e) => e.id == this.pDetails.productId);
    this.detailFilter  = removeDuplicate.map(JSON.stringify).reverse().filter(function (e, i, a) {
      return a.indexOf(e, i + 1) === -1;
    }).reverse().map(JSON.parse);

    if (this.detailFilter.length < 1) {
      this.youAreNotAuthorize();
    }
    else {
      this.detailFilter.forEach((value) => {
        this.addingSpaceToDirection = value.Directions.replace(/\\n/g, "<br />");
        this.addingSpaceToIngredients = value.Ingredients.replace(/\\n/g, "<br />");
      })
    }

    // e.id changed to e.productId
    //2nd way : - By retrieving variable data from service on any product click also gives us data (it uses service in which the variable has product id )

    // this.productId = this.recipesServices.getId;    
    // this.detailFilter = this.recipesServices.recipes.filter((e) => e.productId == this.productId);
    // console.log("detailFilter " + JSON.stringify(this.detailFilter));  
  }

  async youAreNotAuthorize() {
    const toast = await this.toastController.create({
      message: 'This was not created by you.',
      duration: 7000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  //Add to cart

  cartSelect(Quantity) {
    let userId;
    userId = this.userservice.userId;
    if (Quantity.value > 0) {
      this.detailFilter.forEach((value) => {
        this.Shopping.addQuantity(value.productId,userId, value.name, value.sellerName, value.image, Quantity.value, value.price);
      })
      this.Cart();
    }
  }

  Cart() {
    this.Shopping.calculationOfCart();
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

  showPriceOptions() {
    this.showPrice = true;
  }
}
