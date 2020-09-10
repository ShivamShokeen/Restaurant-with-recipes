import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessLoginPage } from './business-login.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessLoginPageRoutingModule {}
