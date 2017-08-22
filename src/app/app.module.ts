import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import {RecipesComponent} from './recipes.component';
import {RecipeService} from './recipe.service';
import {RecipeDetailComponent} from './recipe-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent
  ],
  providers: [ RecipeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
