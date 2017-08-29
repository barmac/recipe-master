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
      .then(res => res.json() as Recipe);
  }

  update(recipe: Recipe, id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe);
  }

  delete(id: string): Promise<void> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null);
  }

  getRecipe(id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe);
  }


  getRecipes(): Promise<Recipe[]> {
    return this.http.get(this.recipesUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe[]);
  }
}
