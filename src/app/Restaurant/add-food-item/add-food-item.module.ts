import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFoodItemPageRoutingModule } from './add-food-item-routing.module';

import { AddFoodItemPage } from './add-food-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFoodItemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddFoodItemPage]
})
export class AddFoodItemPageModule {}
