import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail.component';
import {RecipeFormComponent} from './recipe-form.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'add-recipe', component: RecipeFormComponent },
  { path: 'edit-recipe/:id', component: RecipeFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
