import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class RecipeService {
  private recipesUrl = '/api/recipes';  // URL to web api

  constructor(
    private http: Http,
    private authService: AuthService) { }

  getHeaders(): Headers {
    let headers: Headers;
    const token = this.authService.jwt();

    if (token) {
      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      headers = new Headers({
        'Content-Type': 'application/jsons'
      });
    }

    return headers;
  }

  create(recipe: Recipe): Promise<Recipe> {
    return this.http
      .post(this.recipesUrl, JSON.stringify(recipe), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json() as Recipe);
  }

  update(recipe: Recipe, id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json() as Recipe);
  }

  delete(id: string): Promise<void> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete(url, {headers: this.getHeaders()})
      .toPromise()
      .then(() => null);
  }

  getRecipe(id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get(url, {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json() as Recipe);
  }


  getRecipes(): Promise<Recipe[]> {
    return this.http.get(this.recipesUrl, {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json() as Recipe[]);
  }
}
