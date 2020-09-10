import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveFoodItemsPageRoutingModule } from './remove-food-items-routing.module';

import { RemoveFoodItemsPage } from './remove-food-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveFoodItemsPageRoutingModule
  ],
  declarations: [RemoveFoodItemsPage]
})
export class RemoveFoodItemsPageModule {}
