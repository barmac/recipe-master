import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import {RecipesComponent} from './recipe/recipes/recipes.component';
import {RecipeService} from './recipe/recipe.service';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeFormComponent} from './recipe/recipe-form/recipe-form.component';
import {AlertComponent} from './alert/alert.component';
import {AlertService} from './alert/alert.service';
import {AuthGuard} from './auth/auth.guard';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';

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
    RecipeFormComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    RecipeService,
    AlertService,
    AuthGuard,
    UserService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
