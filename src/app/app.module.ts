import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingEditPageModule } from './Shopping/shopping-edit/shopping-edit.module';
import { RecipesDetailsPageModule } from './Recipes/recipes-details/recipes-details.module';
import { CockpitComponent } from './export-html,export-ts(comonent)/cockpit/cockpit.component';
import { ServerElementComponent } from './export-html,export-ts(comonent)/server-element/server-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvenComponent } from './Assignments/Number game/even/even.component';
import { GameControlComponent } from './Assignments/Number game/game-control/game-control.component';
import { OddComponent } from './Assignments/Number game/odd/odd.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AddAccountComponent } from './Assignments/User Accounts/add-account/add-account.component';
import { EditAccountComponent } from './Assignments/User Accounts/edit-account/edit-account.component';
import { userAccountsService } from './Assignments/User Accounts/user-account.service';
import { CommonModule } from '@angular/common';
import { recipeservices } from './Recipes/recipes.service';
import { shoppingServices } from './Shopping/shopping.service';
import { HomeComponent } from './Typesofroutings/Home/home.component';
import { UserComponent } from './Typesofroutings/users/user/user.component';
import { UsersComponent } from './Typesofroutings/users/users.component';
import { ServerComponent } from './Typesofroutings/server/server.component';
import { userService } from './Typesofroutings/users/users.service';
import { LoginPageModule } from './login/login.module';
import { RecipesEditPage } from './Recipes/recipes-edit/recipes-edit.page';
import { RecipesEditPageModule } from './Recipes/recipes-edit/recipes-edit.module';
import { AddRecipePageModule } from './Recipes/add-recipe/add-recipe.module';
import { FiltersPipe } from './filters.pipe';
import { HttpClientModule } from '@angular/common/http';
import { restaurantService } from './Restaurant/restaurant.service';
import { AddFoodItemPageModule } from './Restaurant/add-food-item/add-food-item.module';
import { EditFoodItemsPageModule } from './Restaurant/edit-food-items/edit-food-items.module';
import { RemoveFoodItemsPageModule } from './Restaurant/remove-food-items/remove-food-items.module';
import { FoodCategoryPageModule } from './Restaurant/food-category/food-category.module';

//  firebase imports, remove what you don't require
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// environment
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: 
  [
    AppComponent,
    CockpitComponent,
    ServerElementComponent,
    EvenComponent,
    GameControlComponent,
    OddComponent,
    DropdownDirective,    
    AddAccountComponent,
    EditAccountComponent,
    HomeComponent,
    UserComponent,
    UsersComponent,
    ServerComponent,
    FiltersPipe,  
  ],
  entryComponents: 
  [
    CockpitComponent,
  ],
  imports: 
  [
    BrowserModule,    
    CommonModule,
    IonicModule.forRoot(),
    FormsModule, 
    AppRoutingModule,    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    RecipesDetailsPageModule,
    ShoppingEditPageModule,
    LoginPageModule,
    RecipesEditPageModule,
    AddRecipePageModule,
    ReactiveFormsModule,    
    HttpClientModule,
    AddFoodItemPageModule,
    EditFoodItemsPageModule,
    RemoveFoodItemsPageModule,
    FoodCategoryPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    userAccountsService,
    recipeservices,
    userService,
    FiltersPipe,
    restaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
