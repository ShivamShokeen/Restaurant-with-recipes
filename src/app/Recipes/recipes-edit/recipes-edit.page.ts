import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipeservices } from '../recipes.service';
import { ModalController, AlertController } from '@ionic/angular';
import { userService } from 'src/app/Typesofroutings/users/users.service';
import { AddRecipePage } from '../add-recipe/add-recipe.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.page.html',
  styleUrls: ['./recipes-edit.page.scss'],
})
export class RecipesEditPage implements OnInit {

  Recipes;
  getRecipeByProductId;
  verify;

  constructor(private route: ActivatedRoute, public RecipesServices: recipeservices, public modalController: ModalController, public userservice: userService, public alertController: AlertController, public http: HttpClient, private router: Router) {
    if (!this.userservice.userId) {
      this.router.navigate(['/login', 'SignIn']);
    }
  }

  ngOnInit() {
    if (this.userservice.userId) {
      this.RecipesServices.getRecipes();
      this.verifyDataBasedOnId();
    }
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  verifyDataBasedOnId() {
    let Filterrecords;
    Filterrecords = this.RecipesServices.recipesData.filter((value) => value.userId == this.userservice.userId);
    this.Recipes = Filterrecords.map(JSON.stringify).reverse().filter(function (e, i, a) {
      return a.indexOf(e, i + 1) === -1;
    }).reverse().map(JSON.parse);
  }

  async moveToAddRecipePage() {
    const modal = await this.modalController.create({
      component: AddRecipePage,
      componentProps: { 'recipes': this.Recipes, 'type': 'edit' }
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
}
