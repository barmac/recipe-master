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
import {RecipeThumbnailComponent} from './recipe/recipe-thumbnail/recipe-thumbnail.component';
import {AlertComponent} from './alert/alert.component';
import {AlertService} from './alert/alert.service';
import {AuthGuard} from './auth/auth.guard';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';

import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {UploadService} from './uploads/shared/upload.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
    RecipeThumbnailComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    UploadFormComponent
  ],
  providers: [
    RecipeService,
    AlertService,
    AuthGuard,
    UserService,
    AuthService,
    UploadService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
