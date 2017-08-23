import {Component, OnInit} from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.recipeService.create(name)
      .then(recipe => {
        this.recipes.push(recipe);
      });
  }

  getTime(recipe): string {
    let result = 'undefined';
    let minutes = 0;
    for (let instruction of recipe.instructions) {
      minutes += instruction.time;
    }
    if (minutes > 0) {
      result = minutes > 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
    }
    return result;
  }

}
