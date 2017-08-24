import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import {RecipesComponent} from './recipes.component';
import {RecipeService} from './recipe.service';
import {RecipeDetailComponent} from './recipe-detail.component';
import {RecipeFormComponent} from './recipe-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeFormComponent
  ],
  providers: [ RecipeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
