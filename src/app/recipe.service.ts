import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipesUrl = 'http://localhost:3000/api/recipes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(name: string): Promise<Recipe> {
    return this.http
      .post(this.recipesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Recipe)
      .catch(this.handleError);
  }

  update(recipe: Recipe): Promise<Recipe> {
    const url = `${this.recipesUrl}/${recipe._id}`;
    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.headers})
      .toPromise()
      .then(() => recipe)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getRecipe(id: number): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Recipe)
      .catch(this.handleError);
  }


  getRecipes(): Promise<Recipe[]> {
    return this.http.get(this.recipesUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json().recipes as Recipe[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
