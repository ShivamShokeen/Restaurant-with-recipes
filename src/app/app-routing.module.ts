import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Typesofroutings/Home/home.component';
import { UserComponent } from './Typesofroutings/users/user/user.component';
import { UsersComponent } from './Typesofroutings/users/users.component';
import { ServerComponent } from './Typesofroutings/server/server.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // Importing components
  {
    path: 'app-home',
    component: HomeComponent
  },
  {
    path: 'app-users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent
      },
    ]
  },
  // {
  //   path : 'app-user/:id/:name',
  //   component : UserComponent
  // },
  {
    path: 'app-server',
    component: ServerComponent
  },
  {
    path: 'app-root',
    component: AppComponent
  },
  {
    path: '',
    redirectTo: 'restaurant-home',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'recipes',
  //   pathMatch: 'full'
  // },
  {
    path: 'recipes',
    loadChildren: () => import('./Recipes/recipes/recipes.module').then(m => m.RecipesPageModule)
  },
  {
    path: 'recipes-details/:id',
    loadChildren: () => import('./Recipes/recipes-details/recipes-details.module').then(m => m.RecipesDetailsPageModule)
  },
  {
    path: 'shopping-edit',
    loadChildren: () => import('./Shopping/shopping-edit/shopping-edit.module').then(m => m.ShoppingEditPageModule)
  },
  {
    path: 'recipes-edit',
    loadChildren: () => import('./Recipes/recipes-edit/recipes-edit.module').then(m => m.RecipesEditPageModule)
  },
  {
    path: 'add-recipe',
    loadChildren: () => import('./Recipes/add-recipe/add-recipe.module').then(m => m.AddRecipePageModule)
  },
  {
    path: 'login/:for',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'restaurant-home',
    loadChildren: () => import('./Restaurant/restaurant-home/restaurant-home.module').then(m => m.RestaurantHomePageModule)
  },
  {
    path: 'restaurant-details/:id',
    loadChildren: () => import('./Restaurant/restaurant-details/restaurant-details.module').then(m => m.RestaurantDetailsPageModule)
  },
  {
    path: 'business-login',
    loadChildren: () => import('./login/business-login/business-login.module').then(m => m.BusinessLoginPageModule)
  },
  {
    path: 'add-food-item/:type',
    loadChildren: () => import('./Restaurant/add-food-item/add-food-item.module').then(m => m.AddFoodItemPageModule)
  },
  {
    path: 'edit-food-items',
    loadChildren: () => import('./Restaurant/edit-food-items/edit-food-items.module').then(m => m.EditFoodItemsPageModule)
  },
  {
    path: 'remove-food-items',
    loadChildren: () => import('./Restaurant/remove-food-items/remove-food-items.module').then(m => m.RemoveFoodItemsPageModule)
  },
  {
    path: 'food-category',
    loadChildren: () => import('./Restaurant/food-category/food-category.module').then( m => m.FoodCategoryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
