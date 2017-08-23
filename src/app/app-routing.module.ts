import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
