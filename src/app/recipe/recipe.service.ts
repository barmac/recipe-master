import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipesUrl = '/api/recipes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(recipe: Recipe): Promise<Recipe> {
    return this.http
      .post(this.recipesUrl, JSON.stringify(recipe), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe)
      .catch(this.handleError);
  }

  update(recipe: Recipe, id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getRecipe(id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe)
      .catch(this.handleError);
  }


  getRecipes(): Promise<Recipe[]> {
    return this.http.get(this.recipesUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json() as Recipe[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
