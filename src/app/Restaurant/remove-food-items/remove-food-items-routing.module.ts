import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveFoodItemsPage } from './remove-food-items.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveFoodItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveFoodItemsPageRoutingModule {}
