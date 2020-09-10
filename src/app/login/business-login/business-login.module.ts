import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessLoginPageRoutingModule } from './business-login-routing.module';

import { BusinessLoginPage } from './business-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessLoginPageRoutingModule
  ],
  declarations: [BusinessLoginPage]
})
export class BusinessLoginPageModule {}
