import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipeservices } from '../recipes.service';
import { ModalController, AlertController } from '@ionic/angular';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {

  @Input('recipes') recipes;
  @Input('type') type;
  types = 'add';

  sellername: any;

  addNewProduct = {
    userId: this.userservice.userId,
    name: "",
    productCategory: "",
    price: 0,
    image: "",
    description: "",
    city: "",
    sellerName: "",
    premium: "",
    Ingredients: "",
    Directions: ""
  };

  recipeEditForm: FormGroup;
  recipesType: any;
  error = null;
  loading = false;
  businessUserDetails;

  @ViewChild('Formforadd', { static: false }) Form;

  constructor(private route: ActivatedRoute, public RecipesServices: recipeservices, public modalController: ModalController, public alertController: AlertController, public userservice: userService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.recipesType = this.route.snapshot.queryParams['Recipetype'];
    if (this.type == 'edit') {
      this.initForm();
    }
    this.RecipesServices.getSellerId();
    this.businessUserDetails = this.userservice.businessUserDetails.filter((value) => value.id == this.userservice.userId);
    // this.businessUserDetails.forEach((value) => {
    //   this.addNewProduct.sellerName = value.name;
    // });
  }

  reset() {
    this.loading = false;
  }


  initForm() {
    let Recipeuserid = '';
    let Recipename = '';
    let Recipeprice = 0;
    let Recipeimage = '';
    let Recipedescription = '';
    let Recipecity = '';
    let Recipesellername = '';
    let Recipepremium = '';
    let Recipeingredients = '';
    let Recipedirections = '';


    this.recipes.forEach((value) => {
      Recipeuserid = value.userId;
      Recipename = value.name;
      Recipeprice = value.price;
      Recipeimage = value.image;
      Recipedescription = value.description;
      Recipecity = value.city;
      Recipesellername = value.sellerName;
      Recipepremium = value.premium;
      Recipeingredients = value.Ingredients;
      Recipedirections = value.Directions;
    });

    this.recipeEditForm = new FormGroup({
      'userid': new FormControl(Recipeuserid),
      'name': new FormControl(Recipename),
      'price': new FormControl(Recipeprice),
      'image': new FormControl(Recipeimage),
      'description': new FormControl(Recipedescription),
      'city': new FormControl(Recipecity),
      'sellerName': new FormControl(Recipesellername),
      'premium': new FormControl(Recipepremium),
      'Ingredients': new FormControl(Recipeingredients),
      'Directions': new FormControl(Recipedirections),
    });
  }

  onRecipeEdit() {
    if (this.recipeEditForm.valid) {
      this.Workinprogress();
    }
    else {
      this.emptyFieldAlert();
    }
  }

  newProduct() {
    if (this.Form.valid == false) {
      this.emptyFieldAlert();
    }
    else {
      this.loading = true;
      this.postdata(this.addNewProduct);
      this.router.navigate(['/recipes']);
    }
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

  onDismiss() {
    this.modalController.dismiss();
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

  private postdata(data) {
    this.http.post('https://restaurant-f5ce2.firebaseio.com/Recipesproduct.json', data).subscribe(responseData => {
    }, error => {
      this.error = error.message;
      console.log(error);
    })
  }

}
