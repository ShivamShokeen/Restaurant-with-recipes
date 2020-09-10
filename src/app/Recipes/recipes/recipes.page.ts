import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { recipeservices } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { LoginPage } from 'src/app/login/login.page';
import { LoginPageModule } from 'src/app/login/login.module';
import { RecipesEditPage } from '../recipes-edit/recipes-edit.page';
import { FiltersPipe } from 'src/app/filters.pipe';
import { userService } from 'src/app/Typesofroutings/users/users.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  Quan = new EventEmitter<number>();
  producttocart = new EventEmitter<string>();
  productQuantity: any[] = [];
  increment: number;
  quantityvalue: number[] = [1, 2, 3, 4, 5]

  Recipes: any;
  // pDetails : 
  // {
  //   id: number
  // }

  @ViewChild('filter', { static: false }) Filters;

  constructor(public modalController: ModalController, private route: ActivatedRoute,
    public popoverController: PopoverController, public pricefilter: FiltersPipe, public userservice: userService,
    public recipesServices: recipeservices,) {
  }

  ngOnInit() {
    //this.recipesServices.getRecipes();
  }

  sortedBy(sort: CustomEvent) {
    let filtered: any;
    // filtered = this.recipesServices.recipes;
    this.pricefilter.transform(filtered);
    //sort.detail.filter((e)=> e.value == value)
  }

  // addQuantity(event : Event) {

  //   //this.increment = event ++;
  //   console.log("Number(event.isTrusted) ;" + Number(event.isTrusted));
  //    this.increment = Number(event.isTrusted) ;
  //    //this.increment ++;
  //   console.log(" Incrementeed value " + this.increment);
  //   // this.productQuantity.push({
  //   //   Quantity: Number(event.isTrusted),
  //   // })
  //   // this.productQuantity.forEach((value)=>{
  //   //   //this.increment = Number(event.isTrusted) + value.Quantity;
  //   //   //console.log(" Incrementeed value " + this.increment);
  //   //   console.log(" Product Quantity" + value.Quantity);
  //   // })
  // }
  // removeQuantity(minusnum) {
  //   //console.log("Product Quantity " + this.productQuantity);
  //   // if(this.productQuantity > 0){
  //   //   console.log("Product Quantity " + this.productQuantity);  
  //   //   this.productQuantity - minusnum;      
  //   // console.log("Deducted Product Quantity " + this.productQuantity);
  //   // }
  // }

  async addNewRecipes() {
    const modal = await this.modalController.create({
      component: RecipesEditPage,
      componentProps: { allowEdit: '0' }
    });
    return await modal.present();
  }

  async editRecipes() {
    const modal = await this.modalController.create({
      component: RecipesEditPage,
      componentProps: { allowEdit: '1' }
    })
    return await modal.present();
  }
}
