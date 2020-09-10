import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFoodItemsPageRoutingModule } from './edit-food-items-routing.module';

import { EditFoodItemsPage } from './edit-food-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFoodItemsPageRoutingModule
  ],
  declarations: [EditFoodItemsPage]
})
export class EditFoodItemsPageModule {}
