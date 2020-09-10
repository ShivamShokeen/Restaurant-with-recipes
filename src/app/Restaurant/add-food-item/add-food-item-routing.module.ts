import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFoodItemPage } from './add-food-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddFoodItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFoodItemPageRoutingModule {}
