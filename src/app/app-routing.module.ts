import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule) },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
